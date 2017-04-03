import { Observable } from 'rxjs/Observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { combineEpics } from 'redux-observable';
import { push } from 'react-router-redux';

import * as actionTypes from './actionTypes';
import * as authActions from './actionCreators';

export function login(action$) {
    return action$.ofType(actionTypes.LOGIN)
        .map(action => action.payload)
        .switchMap(credentials =>
            ajax.post('/api/auth', credentials)
                .flatMap(response => Observable.concat(
                    Observable.of(authActions.loginSuccess(response)),
                    Observable.of(push('/admin'))
                ))
                .catch(error => Observable.of(
                    authActions.loginFailure(error.xhr.response)
                ))
        );
}

export function logout(action$, store) {
    return action$.ofType(actionTypes.LOGOUT)
        .switchMap(action =>
            ajax.delete('/api/auth')
                .flatMap(() => Observable.concat(
                    Observable.of(authActions.logoutSuccess()),
                    Observable.of(push('/admin/login'))
                ))
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
