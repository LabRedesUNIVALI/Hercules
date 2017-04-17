import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';
import { push } from 'react-router-redux';

import * as actionTypes from './actionTypes';
import * as authActions from './actionCreators';

import Api from '../../../lib/api';
import { saveAccessToken, removeAccessToken } from '../../../lib/auth';

export function login(action$) {
    return action$.ofType(actionTypes.LOGIN)
        .map(action => action.payload)
        .switchMap(credentials =>
            Api.post('/api/auth', credentials)
                .flatMap(response => {
                    saveAccessToken(response);
                    return Observable.concat(
                        Observable.of(authActions.loginSuccess(response)),
                        Observable.of(push('/admin'))
                    );
                })
                .catch(error => Observable.of(
                    authActions.loginFailure(error.xhr.response)
                ))
        );
}

export function logout(action$, store) {
    return action$.ofType(actionTypes.LOGOUT)
        .switchMap(action =>
            Api.delete('/api/auth', { auth: true })
                .flatMap(() => {
                    removeAccessToken();
                    return Observable.concat(
                        Observable.of(authActions.logoutSuccess()),
                        Observable.of(push('/admin/login'))
                    );
                })
                .catch(error => Observable.of(
                    authActions.logoutFailure(error.xhr.response)
                ))
        );
}

export function register(action$) {
    return action$.ofType(actionTypes.REGISTER)
        .map(action => action.payload)
        .switchMap(user =>
            Api.post('/api/register', user)
                .flatMap(response => Observable.concat(
                    Observable.of(authActions.registerSuccess(response)),
                    Observable.of(authActions.login({
                        email: user.email,
                        password: user.password
                    }))
                ))
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
