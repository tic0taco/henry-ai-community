import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { once } from 'node:events';
import { createServer } from '../server.mjs';

test('HTTP demo serves only approved assets and rejects writes, traversal and metadata', async () => {
  const server = createServer(); server.listen(0, '127.0.0.1'); await once(server, 'listening');
  const port = server.address().port;
  const request = (path, method = 'GET') => new Promise((resolve, reject) => {
    const req = http.request({ host: '127.0.0.1', port, path, method }, res => {
      let body = ''; res.setEncoding('utf8'); res.on('data', x => body += x);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }));
    }); req.on('error', reject); req.end();
  });
  try {
    for (const path of ['/', '/app.mjs', '/domain.mjs', '/style.css', '/demo.json']) {
      const res = await request(path); assert.equal(res.status, 200);
      assert.equal(res.headers['x-content-type-options'], 'nosniff');
      assert.match(res.headers['content-security-policy'], /default-src 'none'/);
      assert.equal(res.headers['access-control-allow-origin'], undefined);
    }
    assert.equal((await request('/', 'HEAD')).body, '');
    for (const path of ['/.git/config', '/.env', '/package.json', '/../README.md', '/%2e%2e/README.md', '/demo.json?path=.env']) {
      assert.equal((await request(path)).status, 404);
    }
    for (const method of ['POST', 'PUT', 'DELETE', 'OPTIONS']) assert.equal((await request('/demo.json', method)).status, 405);
  } finally { await new Promise(resolve => server.close(resolve)); }
});
