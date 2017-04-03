import { createStore, combineReducers, applyMiddleware } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';

import rootEpic from './modules/epics';
import reducers from './modules/reducers';

const configureStore = () => {
    
    const epicMiddleware = createEpicMiddleware(rootEpic);

    const middleware = [
        createLogger(),
        epicMiddleware
    ];

    const rootReducer = combineReducers({
        ...reducers,
        routing: routerReducer
    });

    const store = createStore(
        rootReducer,
        applyMiddleware(...middleware)
    );

    return store;

};

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

export { history };
export default store;
