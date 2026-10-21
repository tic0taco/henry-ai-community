import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

// Exact map: source, docs, Git metadata and arbitrary files cannot be served.
const routes = new Map([
  ['/', ['public/index.html', 'text/html; charset=utf-8']],
  ['/app.mjs', ['public/app.mjs', 'text/javascript; charset=utf-8']],
  ['/domain.mjs', ['public/domain.mjs', 'text/javascript; charset=utf-8']],
  ['/style.css', ['public/style.css', 'text/css; charset=utf-8']],
  ['/demo.json', ['data/demo.json', 'application/json; charset=utf-8']]
]);
export function createServer() {
  return http.createServer(async (req, res) => {
    const headers = {
      'Content-Security-Policy': "default-src 'none'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
      'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer',
      'Cache-Control': 'no-store', 'Permissions-Policy': 'microphone=(), camera=(), geolocation=()'
    };
    if (!['GET', 'HEAD'].includes(req.method)) {
      res.writeHead(405, { ...headers, Allow: 'GET, HEAD' }); return res.end();
    }
    const route = routes.get(req.url);
    if (!route) { res.writeHead(404, headers); return res.end('Not found'); }
    try {
      const body = await readFile(new URL(route[0], import.meta.url));
      res.writeHead(200, { ...headers, 'Content-Type': route[1] });
      res.end(req.method === 'HEAD' ? undefined : body);
    } catch { res.writeHead(500, headers); res.end('Demo asset unavailable'); }
  });
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const server = createServer();
  server.on('error', () => { console.error('Demo could not start. Check whether port 4173 is available.'); process.exitCode = 1; });
  server.listen(4173, '127.0.0.1', () => console.log('Henry AI Community: http://127.0.0.1:4173'));
}
