import { createStore, combineReducers, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { createLogger } from 'redux-logger';

const configureStore = () => {
    
    const middleware = [createLogger()];
    
    const store = createStore(
        combineReducers({
            routing: routerReducer
        }),
        applyMiddleware(...middleware)
    );

    return store;

};

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

export default store;
export { history };
