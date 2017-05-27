import React                   from 'react';
import { Route, IndexRoute }   from 'react-router';
import App                     from 'components/page';

export default (
  <Route name="app" component={App} path="*">
  </Route>
);
