import * as actionTypes from './actionTypes';

export function login(payload) {
    return { type: actionTypes.LOGIN, payload };
}

export function loginSuccess(payload) {
    return { type: actionTypes.LOGIN_SUCCESS, payload };
}

export function loginFailure(payload) {
    return { type: actionTypes.LOGIN_FAILURE, payload, error: true };
}

export function logout() {
    return { type: actionTypes.LOGOUT };
}

export function logoutSuccess() {
    return { type: actionTypes.LOGOUT_SUCCESS };
}

export function logoutFailure(payload) {
    return { type: actionTypes.LOGOUT_FAILURE, payload, error: true };
}

export function register(payload) {
    return { type: actionTypes.REGISTER, payload };
}

export function registerSuccess(payload) {
    return { type: actionTypes.REGISTER_SUCCESS, payload };
}

export function registerFailure(payload) {
    return { type: actionTypes.REGISTER_SUCCESS, payload, error: true };
}
