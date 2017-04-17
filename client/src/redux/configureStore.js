import { createStore, combineReducers, applyMiddleware } from 'redux';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';

import rootEpic from './modules/epics';
import reducers from './modules/reducers';

import { getAccessToken } from '../lib/auth';

const getPreloadedState = () => {

    const accessToken = getAccessToken();

    if (accessToken) {
        return {
            auth: {
                token: accessToken,
                isLoggedIn: true
            }
        }
    }

};

const configureStore = () => {

    const epicMiddleware = createEpicMiddleware(rootEpic);

    const middleware = [
        routerMiddleware(browserHistory),
        epicMiddleware
    ];

    if (process.env.NODE_ENV === 'development') {
        middleware.push(createLogger({
            predicate: (getState, action) => !action.type.includes('@@router')
        }));
    }

    const rootReducer = combineReducers({
        ...reducers,
        routing: routerReducer
    });

    const store = createStore(
        rootReducer,
        getPreloadedState(),
        applyMiddleware(...middleware)
    );

    return store;

};

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

export { history };
export default store;
