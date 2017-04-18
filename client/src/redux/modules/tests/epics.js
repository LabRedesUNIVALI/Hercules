import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';
import querystring from 'querystring';

import Api from '../../../lib/api';
import * as actionTypes from './actionTypes';
import * as actions from './actionCreators';

export function fetchTest(action$) {
    return action$.ofType(actionTypes.FETCH_ONE)
        .map(action => action.payload)
        .switchMap(id =>
            Api.get(`/tests/${id}`, { auth: true })
                .map(response => actions.fetchTestSuccess(response))
                .catch(error => Observable.of(
                    actions.fetchTestFailure(error.xhr.response)
                ))
        );
}

export function fetchTests(action$) {
    return action$.ofType(actionTypes.FETCH_ALL)
        .map(action => action.payload)
        .switchMap(params =>
            Api.get(`/tests?${querystring.stringify(params)}`, { auth: true })
                .map(response => actions.fetchTestsSuccess(response))
                .catch(error => Observable.of(
                    actions.fetchTestsFailure(error.xhr.response)
                ))
        );
}

export function createTest(action$) {
    return action$.ofType(actionTypes.CREATE)
        .map(action => action.payload)
        .switchMap(test =>
            Api.post('/tests', test, { auth: true })
                .map(response => actions.createTestSuccess(response))
                .catch(error => Observable.of(
                    actions.createTestFailure(error.xhr.response)
                ))
        );
}

export function updateTest(action$) {
    return action$.ofType(actionTypes.UPDATE)
        .map(action => action.payload)
        .switchMap(test =>
            Api.put(`/tests/${test.id}`, test, { auth: true })
                .map(response => actions.updateTestSuccess(response))
                .catch(error => Observable.of(
                    actions.updateTestFailure(error.xhr.response)
                ))
        );
}

export function deleteTest(action$) {
    return action$.ofType(actionTypes.UPDATE)
        .map(action => action.payload)
        .switchMap(test =>
            Api.delete(`/tests/${test.id}`, { auth: true })
                .map(response => actions.deleteTestSuccess(response))
                .catch(error => Observable.of(
                    actions.deleteTestFailure(error.xhr.response)
                ))
        );
}

export default combineEpics(
    fetchTest,
    fetchTests,
    createTest,
    updateTest,
    deleteTest
);
