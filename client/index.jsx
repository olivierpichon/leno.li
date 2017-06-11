import React                  from 'react'
import { render }             from 'react-dom'
import { Router, match }      from 'react-router';
import createBrowserHistory   from 'history/lib/createBrowserHistory'
import { Provider }           from 'react-redux'
import * as reducers          from 'reducers'
import routes                 from 'routes'
import immutifyState          from 'lib/immutifyState'
import logger                 from 'lib/logger'
import fetchComponentData     from 'lib/fetchComponentData'
import { createStore,
    combineReducers,
    applyMiddleware }  from 'redux'

import thunk from 'redux-thunk'

const middleware = process.env.NODE_ENV === 'production'
  ? [thunk]
  : [thunk, logger]

const initialState = immutifyState(window.__INITIAL_STATE__);

const history = createBrowserHistory();

const reducer = combineReducers(reducers);
const store   = applyMiddleware(...middleware)(createStore)(reducer, initialState);

history.listen(location => {
  match({ routes, history }, (error, redirectLocation, renderProps) => {
    fetchComponentData(store.dispatch,
                       renderProps.components,
                       renderProps.params,
                       store.getState().gdrive.get('authorization').toJS()
    )
  })
});

render(
    <Provider store={store}>
      <Router children={routes} history={history} />
    </Provider>,
    document.getElementById('react-view')
);