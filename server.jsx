import express                   from 'express'
import path                      from 'path'
import React                     from 'react'
import { renderToString }        from 'react-dom/server'
import { RouterContext, match }  from 'react-router'
import { createLocation }        from 'history/lib/LocationUtils'
import routes                    from './shared/routes'
import { Provider }              from 'react-redux'
import * as reducers             from './shared/reducers'
import logger                    from './shared/lib/logger'
import fetchComponentData        from './shared/lib/fetchComponentData'
import getGdriveCredentials      from './shared/lib/getGdriveCredentials'
import { createStore,
         combineReducers,
         applyMiddleware }       from 'redux';
import thunk from 'redux-thunk'
import axios from './shared/lib/axios'

const middleware = process.env.NODE_ENV === 'production'
  ? [thunk]
  : [thunk, logger]

const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('./webpack.dev').default(app);
}

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/server_imgs/:id', (req, res) => {
  const { params, query } = req
  const queryParams = `?alt=media`
  return axios.get(`/files/${params.id}${queryParams}`, {responseType:'stream', headers: {'Authorization': 'Bearer '+ query.access_token}})
    .then(({ data }) => {
      res.writeHead(200, {
        'Content-Type': data.headers['content-type']
      });
      data.pipe(res)
    })
})

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
          <meta name="viewport" content="width=device-width, initial-scale=1" />
		      <link rel="stylesheet" href="/style.css" />
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
    getGdriveCredentials(store.dispatch, renderProps.components, renderProps.params).catch(console.error)
      .then((authorization) => { return fetchComponentData(store.dispatch, renderProps.components, renderProps.params, authorization) })
      .then(renderView)
      .then(html => {
        res.set('Content-Type', 'text/html');
        res.end(html)
      })
      .catch(err => res.end(err.message));
  });
});


export default app;
