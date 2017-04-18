import * as actionTypes from './actionTypes';

export function createTest(payload) {
    return { type: actionTypes.CREATE, payload };
}

export function createTestSuccess(payload) {
    return { type: actionTypes.CREATE_SUCCESS, payload };
}

export function createTestFailure(payload) {
    return { type: actionTypes.CREATE_FAILURE, payload, error: true };
}

export function updateTest(payload) {
    return { type: actionTypes.DELETE, payload };
}

export function updateTestSuccess(payload) {
    return { type: actionTypes.UPDATE_SUCCESS, payload };
}

export function updateTestFailure(payload) {
    return { type: actionTypes.UPDATE_FAILURE, payload, error: true };
}

export function deleteTest(payload) {
    return { type: actionTypes.DELETE, payload };
}

export function deleteTestSuccess(payload) {
    return { type: actionTypes.DELETE_SUCCESS, payload };
}

export function deleteTestFailure(payload) {
    return { type: actionTypes.DELETE_FAILURE, payload, error: true };
}

export function fetchTests() {
    return { type: actionTypes.FETCH_ALL };
}

export function fetchTestsSuccess(payload) {
    return { type: actionTypes.FETCH_ALL_SUCCESS, payload };
}

export function fetchTestsFailure(payload) {
    return { type: actionTypes.FETCH_ALL_FAILURE, payload, error: true };
}
