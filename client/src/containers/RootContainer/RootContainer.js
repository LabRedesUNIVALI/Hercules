import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import NavigationRouter from '../NavigationRouter';
import defaultTheme from '../../themes/default';

class RootContainer extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={defaultTheme}>
                <NavigationRouter />
            </MuiThemeProvider>
        );
    }
}

export default RootContainer;
