import React                   from 'react';
import { Route, IndexRoute }   from 'react-router';
import Layout                  from './components/layout';
import HomePage                from './components/home-page';
import Album                   from './components/album/index'

export default (
  <Route component={Layout} path="/">
    <IndexRoute component={HomePage} />
    <Route component={Album} path="/albums(/:album_id)" />
  </Route>
);
