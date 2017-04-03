import { Observable } from 'rxjs/Observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { combineEpics } from 'redux-observable';

import * as actionTypes from './actionTypes';
import * as authActions from './actionCreators';

export function login(action$) {
    return action$.ofType(actionTypes.LOGIN)
        .map(action => action.payload)
        .switchMap(credentials =>
            ajax.post('/api/auth', credentials)
                .map(response => authActions.loginSuccess(response))
                .catch(error => Observable.of(
                    authActions.loginFailure(error.xhr.response)
                ))
        );
}

export function logout(action$) {
    return action$.ofType(actionTypes.LOGOUT)
        .switchMap(action =>
            ajax.delete('/api/auth')
                .map(() => authActions.logoutSuccess())
                .catch(error => Observable.of(
                    authActions.logoutFailure(error.xhr.response)
                ))
        );
}

export function register(action$) {
    return action$.ofType(actionTypes.REGISTER)
        .map(action => action.payload)
        .switchMap(user =>
            ajax.post('/api/register', user)
                .map(response => authActions.registerSuccess(response))
                .catch(error => Observable.of(
                    authActions.registerFailure(error.xhr.response)
                ))
        );
}

export default combineEpics(
    login,
    logout,
    register
);
