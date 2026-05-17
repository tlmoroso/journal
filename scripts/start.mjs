import { createServer } from 'node:http';
import { Readable } from 'node:stream';
import app from '../dist/server/server.js';

const port = Number(process.env.PORT || 3000);

const server = createServer(async (req, res) => {
  try {
    const origin = `http://${req.headers.host || `localhost:${port}`}`;
    const url = new URL(req.url || '/', origin);
    const method = req.method || 'GET';
    const hasBody = method !== 'GET' && method !== 'HEAD';

    const request = new Request(url, {
      method,
      headers: req.headers,
      body: hasBody ? Readable.toWeb(req) : undefined,
      duplex: hasBody ? 'half' : undefined,
    });

    const response = await app.fetch(request);

    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    if (!response.body) {
      res.end();
      return;
    }

    Readable.fromWeb(response.body).pipe(res);
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('content-type', 'text/plain; charset=utf-8');
    res.end(`Internal Server Error\n${error instanceof Error ? error.message : String(error)}`);
  }
});

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`);
});
