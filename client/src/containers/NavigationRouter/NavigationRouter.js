import React, { Component } from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import { history } from '../../redux/configureStore';
import AdminContainer from '../AdminContainer';
import AdminLogin from '../AdminLogin';
import AdminRegister from '../AdminRegister';
import Overview from '../Overview';

class NavigationRouter extends Component {
    render() {
        return (
            <Router history={history}>
                <Route exact path="/admin" component={AdminContainer}>
                    <IndexRoute component={Overview} />
                </Route>
                <Route exact path="/admin/login" component={AdminLogin} />
                <Route exact path="/admin/register" component={AdminRegister} />
            </Router>
        );
    }
}

export default NavigationRouter;
