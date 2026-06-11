const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const API_HOST = 'api.restcountries.com';
const API_KEY = 'rc_live_707d2001ea0e46b2aa34fcd05528b5a6';

const MIME = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.json': 'application/json',
};

function serveStatic(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
    res.end(data);
  });
}

function proxyAPI(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const query = url.search;

  const options = {
    hostname: API_HOST,
    path: `/countries/v5${query}`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${API_KEY}`
    }
  };

  const proxy = https.request(options, (apiRes) => {
    let body = '';
    apiRes.on('data', chunk => body += chunk);
    apiRes.on('end', () => {
      res.writeHead(apiRes.statusCode, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      });
      res.end(body);
    });
  });

  proxy.on('error', () => {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Proxy error' }));
  });

  proxy.end();
}

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/api') && (req.url.length === 4 || req.url[4] === '?' || req.url[4] === '/')) {
    return proxyAPI(req, res);
  }

  const filePath = '.' + (req.url === '/' ? '/index.html' : req.url.split('?')[0]);
  serveStatic(res, filePath);
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
