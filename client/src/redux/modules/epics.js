import { combineEpics } from 'redux-observable';

import authEpics from './auth/epics';
import themeEpics from './themes/epics';
import disciplineEpics from './disciplines/epics';
import questionEpics from './questions/epics';
import testEpics from './tests/epics';

export default combineEpics(
    authEpics,
    themeEpics,
    disciplineEpics,
    questionEpics,
    testEpics
);
