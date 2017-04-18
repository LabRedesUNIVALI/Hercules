import authReducer from './auth/reducer';
import themesReducer from './themes/reducer';
import disciplinesReducer from './disciplines/reducer';
import questionsReducer from './questions/reducer';
import testsReducer from './tests/reducer';

export default {
    auth: authReducer,
    themes: themesReducer,
    disciplines: disciplinesReducer,
    questions: questionsReducer,
    tests: testsReducer
};
