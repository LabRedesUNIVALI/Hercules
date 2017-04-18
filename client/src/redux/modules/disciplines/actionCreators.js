import * as actionTypes from './actionTypes';

export function createDiscipline(payload) {
    return { type: actionTypes.CREATE, payload };
}

export function createDisciplineSuccess(payload) {
    return { type: actionTypes.CREATE_SUCCESS, payload };
}

export function createDisciplineFailure(payload) {
    return { type: actionTypes.CREATE_FAILURE, payload, error: true };
}

export function updateDiscipline(payload) {
    return { type: actionTypes.UPDATE, payload };
}

export function updateDisciplineSuccess(payload) {
    return { type: actionTypes.UPDATE_SUCCESS, payload };
}

export function updateDisciplineFailure(payload) {
    return { type: actionTypes.CREATE_FAILURE, payload, error: true };
}

export function deleteDiscipline(payload) {
    return { type: actionTypes.DELETE, payload };
}

export function deleteDisciplineSuccess(payload) {
    return { type: actionTypes.DELETE_SUCCESS, payload };
}

export function deleteDisciplineFailure(payload) {
    return { type: actionTypes.DELETE_FAILURE, payload, error: true };
}

export function fetchDisciplines() {
    return { type: actionTypes.FETCH_ALL };
}

export function fetchDisciplinesSuccess(payload) {
    return { type: actionTypes.FETCH_ALL_SUCCESS, payload };
}

export function fetchDisciplinesFailure(payload) {
    return { type: actionTypes.FETCH_ALL_FAILURE, payload, error: true };
}
