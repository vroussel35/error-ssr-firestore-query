import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';

import { join } from 'path';

import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import { AppServerModule } from './src/main.server';

const timeoutMin = 15; // 15 min timeout

// The Express app is exported so that it can be used by serverless Functions.
export function createApp() {

  const app = express();

  const distFolder = join(process.cwd(), 'dist/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  app.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  app.set('view engine', 'html');
  app.set('views', distFolder);

  // TODO: implement data requests securely
  app.get('/api/**', (req, res) => {
    res.status(404).send('data requests are not yet supported');
  });

  // Serve static files from /browser
  app.get('*.*', express.static(distFolder, {
    maxAge: '1y',
  }));

  // All regular routes use the Universal engine
  app.get('*', (req, res) => {

    const dateBeginCall = new Date().toLocaleString();

    // All regular routes use the Universal engine
    console.log(dateBeginCall, 'Begin call req.url =>', req.url);

    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }], res }, (error, html) => {

      console.log(res.statusCode + ' => ', req.url);

      if (error === undefined || error === null) {
        res.status(res.statusCode).send(html);
      } else {
        console.error(new Error(error.name + ' ' + error.message + ' ' + error.stack));
        res.status(500).send(error);
      }

      console.log(new Date().toLocaleString(), 'End call req.url =>', req.url, '(started ' + dateBeginCall + ')');

    });

  });

  // // All regular routes use the Universal engine
  // server.get('*', (req, res) => {
  //   res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  // });

  return app;
}

function run() {

  const port = process.env.PORT || 4000;

  // Start up the Node server
  const appExpress = createApp();
  const server = appExpress.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });

  server.setTimeout(1000 * 90 * timeoutMin);

}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
