import * as actionTypes from './actionTypes';

export function createTheme(payload) {
    return { type: actionTypes.CREATE, payload };
}

export function createThemeSuccess(payload) {
    return { type: actionTypes.CREATE_SUCCESS, payload };
}

export function createThemeFailure(payload) {
    return { type: actionTypes.CREATE_FAILURE, payload, error: true };
}

export function updateTheme(payload) {
    return { type: actionTypes.DELETE, payload };
}

export function updateThemeSuccess(payload) {
    return { type: actionTypes.UPDATE_SUCCESS, payload };
}

export function updateThemeFailure(payload) {
    return { type: actionTypes.UPDATE_FAILURE, payload, error: true };
}

export function deleteTheme(payload) {
    return { type: actionTypes.DELETE, payload };
}

export function deleteThemeSucess(payload) {
    return { type: actionTypes.DELETE_SUCCESS, payload };
}

export function deleteThemeFailure(payload) {
    return { type: actionTypes.DELETE_FAILURE, payload, error: true };
}

export function fetchThemes() {
    return { type: actionTypes.FETCH_ALL };
}

export function fetchThemesSuccess(payload) {
    return { type: actionTypes.FETCH_ALL_SUCCESS, payload };
}

export function fetchThemesFailure(payload) {
    return { type: actionTypes.FETCH_ALL_FAILURE, payload, error: true };
}
