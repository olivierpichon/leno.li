import React                  from 'react';
import { render }             from 'react-dom';
import { Router }             from 'react-router';
import createBrowserHistory   from 'history/lib/createBrowserHistory';
import { Provider }           from 'react-redux';
import * as reducers          from 'reducers';
import routes                 from 'routes';
import immutifyState          from 'lib/immutifyState';
import { listFolder }         from '../shared/actions/dropbox/action-creators'
import { createStore,
    combineReducers,
    applyMiddleware }  from 'redux';

import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

const middleware = process.env.NODE_ENV === 'production'
  ? [thunk]
  : [thunk, createLogger()]

const initialState = immutifyState(window.__INITIAL_STATE__);

const history = createBrowserHistory();

const reducer = combineReducers(reducers);
const store   = applyMiddleware(...middleware)(createStore)(reducer, initialState);

history.listen(location => {
  const params = { splat: location.pathname.substring(1) }
  store.dispatch(listFolder(params))
});

render(
    <Provider store={store}>
      <Router children={routes} history={history} />
    </Provider>,
    document.getElementById('react-view')
);