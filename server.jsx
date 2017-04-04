import express                   from 'express';
import React                     from 'react';
import { renderToString }        from 'react-dom/server';
import { RouterContext, match }  from 'react-router';
import { createLocation }        from 'history/lib/LocationUtils';
import routes                    from 'routes';
import { Provider }              from 'react-redux';
import * as reducers             from 'reducers';
import promiseMiddleware         from 'lib/promiseMiddleware';
import fetchComponentData        from 'lib/fetchComponentData';
import { createStore,
         combineReducers,
         applyMiddleware }       from 'redux';
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

const middleware = process.env.NODE_ENV === 'production'
  ? [thunk]
  : [thunk, createLogger()]

const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('./webpack.dev').default(app);
}

app.use( (req, res) => {
  const location = createLocation(req.url);
  const reducer  = combineReducers(reducers);
  const store    = createStore(reducer, undefined, applyMiddleware(...middleware))

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if(!renderProps)
      return res.status(404).end('Not found');


    function renderView() {
      const InitialView = (
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );
      
      const componentHTML = renderToString(InitialView);

      const initialState = store.getState();

      const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>LenOli</title>

          <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          </script>
        </head>
        <body>
          <div id="react-view">${componentHTML}</div>
          <script type="application/javascript" src="/bundle.js"></script>
        </body>
      </html>
      `;

      return HTML;
    }
    fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
      .then(renderView)
      .then(html => res.end(html))
      .catch(err => res.end(err.message));
  });
});


export default app;
