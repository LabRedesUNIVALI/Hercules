import { combineReducers } from 'redux';

import themesReducer from './themes/reducer';

export default combineReducers({
    themes: themesReducer
});
