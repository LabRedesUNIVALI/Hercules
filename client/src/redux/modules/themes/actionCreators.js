import * as actionTypes from './actionTypes';

export function createTheme(payload) {
    return { type: actionTypes.CREATE_REQUEST, payload };
}

export function createThemeSuccess(payload) {
    return { type: actionTypes.CREATE_SUCCESS, payload };
}

export function createThemeFailure(error) {
    return { type: actionTypes.CREATE_FAILURE, error };
}

export function updateTheme(payload) {
    return { type: actionTypes.DELETE_REQUEST, payload };
}

export function updateThemeSuccess(payload) {
    return { type: actionTypes.UPDATE_SUCCESS, payload };
}

export function updateThemeFailure(error) {
    return { type: actionTypes.UPDATE_FAILURE, error };
}

export function deleteTheme(payload) {
    return { type: actionTypes.DELETE_REQUEST, payload };
}

export function deleteThemeSucess(payload) {
    return { type: actionTypes.DELETE_SUCCESS, payload };
}

export function deleteThemeFailure(error) {
    return { type: actionTypes.DELETE_FAILURE, error };
}
