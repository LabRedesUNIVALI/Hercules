import { combineEpics } from 'redux-observable';

import authEpics from './auth/epics';
import themeEpics from './themes/epics';

export default combineEpics(
    authEpics,
    themeEpics
);
