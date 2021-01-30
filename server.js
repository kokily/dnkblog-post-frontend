const Koa = require('koa');
const Router = require('@koa/router');
const next = require('next');
const https = require('https');
const http = require('http');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const devApp = next({ dev });
const handle = devApp.getRequestHandler();

devApp.prepare().then(() => {
  const app = new Koa();
  const router = new Router();
  const configurations = {
    production: { ssl: true, port: 443, hostname: 'dnkdream.com' },
    development: { ssl: false, port: 3000, hostname: 'localhost' },
  };
  const environment = process.env.NODE_ENV || 'production';
  const config = configurations[environment];

  router.all('(.*)', async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  router.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  app.use(router.routes());

  let server;

  if (config.ssl) {
    server = https.createServer(
      {
        key: fs.readFileSync(`${process.env.SSL_KEY}`),
        cert: fs.readFileSync(`${process.env.SSL_CERT}`),
      },
      app.callback()
    );
  } else {
    server = http.createServer(app.callback());
  }

  server.listen(config.port, () => {
    console.log(`> Ready on http(s)://${config.hostname}:${config.port}`);
  });
});
