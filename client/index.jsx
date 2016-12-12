import React                  from 'react';
import { render }             from 'react-dom';
import { Router }             from 'react-router';
import routes                 from 'routes';
import createBrowserHistory   from 'history/lib/createBrowserHistory'

const history = createBrowserHistory();

render(
    <Router children={routes} history={history} />,
    document.getElementById('react-view')
);