import express                   from 'express';
import React                     from 'react';
import { createLocation }        from 'history/lib/LocationUtils';
import routes                    from 'routes';
import { renderToString }        from 'react-dom/server'
import { RouterContext, match }  from 'react-router';
import { AppContainer }          from 'react-hot-loader';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('./webpack.dev').default(app);
}

app.use( (req, res) => {
  const location = createLocation(req.url);
  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if(!renderProps)
      return res.status(404).end('Not found');


    function renderView() {
      const InitialView = (
        <RouterContext {...renderProps} />
      );
      
      const componentHTML = renderToString(InitialView);


      const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>LenOli</title>

        </head>
        <body>
          <div id="react-view">${componentHTML}</div>
          <script type="application/javascript" src="/bundle.js"></script>
        </body>
      </html>
      `;

      return HTML;
    }
    res.end(renderView());
  });
});


export default app;
