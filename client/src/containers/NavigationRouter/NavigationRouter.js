import React, { Component } from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import { history } from '../../redux/configureStore';
import AdminContainer from '../AdminContainer';
import Overview from '../Overview';

class NavigationRouter extends Component {
    render() {
        return (
            <Router history={history}>
                <Route exact path="/" component={AdminContainer}>
                    <IndexRoute component={Overview} />
                </Route>
            </Router>
        );
    }
}

export default NavigationRouter;
