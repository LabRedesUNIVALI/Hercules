import { createStore, combineReducers, applyMiddleware } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';

import rootEpic from './modules/epics';
import rootReducer from './modules/reducers';

const configureStore = () => {
    
    const epicMiddleware = createEpicMiddleware(rootEpic);

    const middleware = [
        createLogger(),
        epicMiddleware
    ];
    
    const reducers = combineReducers({
        ...rootReducer,
        routing: routerReducer
    })
    
    const store = createStore(
        reducers,
        applyMiddleware(...middleware)
    );

    return store;

};

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

export { history };
export default store;
