import React, { Component } from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import { history } from '../../redux/configureStore';
import AdminContainer from '../AdminContainer';
import AdminLogin from '../AdminLogin';
import AdminRegister from '../AdminRegister';
import Overview from '../Overview';
import ThemeList from '../ThemeList';

class NavigationRouter extends Component {
    render() {
        return (
            <Router history={history}>
                <Route exact path="/admin" component={AdminContainer}>
                    <IndexRoute component={Overview} />
                    <Route exact path="/admin/themes" component={ThemeList} />
                </Route>
                <Route exact path="/admin/login" component={AdminLogin} />
                <Route exact path="/admin/register" component={AdminRegister} />
            </Router>
        );
    }
}

export default NavigationRouter;
