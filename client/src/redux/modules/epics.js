import { combineEpics } from 'redux-observable';

import themeEpics from './themes/epics';

export default combineEpics(
    themeEpics
);
