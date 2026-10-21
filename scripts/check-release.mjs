import { readdir, readFile, lstat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';

const root = fileURLToPath(new URL('../', import.meta.url));
export const allowed = [
  '.gitignore', 'AGENTS.md', 'README.md', 'LICENSE-STATUS.md', 'SECURITY.md', 'package.json',
  'data/demo.json', 'docs/ARCHITECTURE.md', 'docs/REUSE_DECISION.md', 'docs/RELEASE.md', 'docs/THIRD_PARTY.md',
  'public/index.html', 'public/app.mjs', 'public/domain.mjs', 'public/style.css', 'server.mjs',
  'scripts/check-release.mjs', 'tests/domain.test.mjs', 'tests/server.test.mjs'
].sort();
const errors = [];
async function walk(dir, prefix = '') {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (!prefix && entry.name === '.git') continue;
    const name = prefix + entry.name; const full = path.join(dir, entry.name);
    if ((await lstat(full)).isSymbolicLink()) { errors.push('Symlink rejected: ' + name); continue; }
    if (entry.isDirectory()) files.push(...await walk(full, name + '/'));
    else files.push(name);
  }
  return files.sort();
}
const files = await walk(root);
if (JSON.stringify(files) !== JSON.stringify(allowed)) errors.push('File list differs from reviewed allowlist.');
const patterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,}|sk-(?:proj-|ant-)?[A-Za-z0-9_-]{24,})/,
  /\b(?:192\.168\.\d{1,3}\.\d{1,3}|10\.\d{1,3}\.\d{1,3}\.\d{1,3})\b/,
  /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/,
  /\b(?:password|api_key|access_token)\s*[:=]\s*["'][^"'\r\n]+["']/i
];
const inventory = [];
for (const file of files) {
  const bytes = await readFile(path.join(root, file));
  const content = bytes.toString('utf8');
  if (bytes.includes(0)) errors.push('Binary rejected: ' + file);
  if (patterns.some(pattern => pattern.test(content))) errors.push('Sensitive pattern; review required: ' + file);
  inventory.push({ file, sha256: createHash('sha256').update(bytes).digest('hex') });
}
const manifest = JSON.parse(await readFile(path.join(root, 'package.json')));
if (Object.keys(manifest.dependencies || {}).length || Object.keys(manifest.devDependencies || {}).length) errors.push('Dependencies require a new review.');
if (manifest.private !== true || manifest.license !== 'UNLICENSED') errors.push('Private review status changed; rights review required.');
const demo = JSON.parse(await readFile(path.join(root, 'data/demo.json')));
if (demo.synthetic !== true || demo.invoices.some(x => !x.id.startsWith('DEMO-')) || demo.jobs.some(x => !x.id.startsWith('DEMO-'))) errors.push('Demo marker missing.');
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
try {
  if (git('rev-list', '--all', '--count') !== '1') errors.push('Expected exactly one fresh commit.');
  if (git('remote')) errors.push('Remote configured; review required.');
  if (git('status', '--porcelain', '--untracked-files=all')) errors.push('Working tree is not clean.');
  const tracked = git('ls-files').split('\n').sort();
  if (JSON.stringify(tracked) !== JSON.stringify(allowed)) errors.push('Tracked files differ from allowlist.');
  if (git('rev-list', '--max-parents=0', '--all').split('\n').length !== 1) errors.push('Unexpected root history.');
} catch { errors.push('A standalone initialized Git repository is required.'); }
console.log(JSON.stringify({ passed: errors.length === 0, publicationApproved: false, errors, inventory }, null, 2));
if (errors.length) process.exitCode = 1;
