import React, { Component } from 'react';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import store from '../redux/configureStore';
import RootContainer from './RootContainer';

injectTapEventPlugin();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <RootContainer />
            </Provider>
        );
    }
}

export default App;
