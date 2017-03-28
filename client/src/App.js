import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    lightBlue700,
    lightBlue500,
    lightBlue100,
    white,
    redA200,
    grey900,
    grey600,
    grey400
} from 'material-ui/styles/colors';

import Sidenav from './components/Sidenav/Sidenav';
import Navbar from './components/Navbar/Navbar';
import store, { history } from './store';

injectTapEventPlugin();

const Dashboard = () => {
    return (
        <div>
            <Sidenav />
            <Navbar />
        </div>
    );
}

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: lightBlue700,
        primary2Color: lightBlue500,
        primary3Color: lightBlue100,
        accent1Color: redA200,
        accent2Color: grey400,
        accent3Color: grey600,
        textColor: grey900,
        alternateTextColor: white
    }
});

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <Router history={history}>
                        <Route exact path="/" component={Dashboard} />
                    </Router>
                </MuiThemeProvider>
            </Provider>
        );
  }
}

export default App;
