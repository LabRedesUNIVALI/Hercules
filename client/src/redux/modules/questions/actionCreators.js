import * as actionTypes from './actionTypes';

export function createQuestion(payload) {
    return { type: actionTypes.CREATE, payload };
}

export function createQuestionSuccess(payload) {
    return { type: actionTypes.CREATE_SUCCESS, payload };
}

export function createQuestionFailure(payload) {
    return { type: actionTypes.CREATE_FAILURE, payload, error: true };
}

export function updateQuestion(payload) {
    return { type: actionTypes.UPDATE, payload };
}

export function updateQuestionSuccess(payload) {
    return { type: actionTypes.UPDATE_SUCCESS, payload };
}

export function updateQuestionFailure(payload) {
    return { type: actionTypes.CREATE_FAILURE, payload, error: true };
}

export function deleteQuestion(payload) {
    return { type: actionTypes.DELETE, payload };
}

export function deleteQuestionSuccess(payload) {
    return { type: actionTypes.DELETE_SUCCESS, payload };
}

export function deleteQuestionFailure(payload) {
    return { type: actionTypes.DELETE_FAILURE, payload, error: true };
}

export function fetchQuestions() {
    return { type: actionTypes.FETCH_ALL };
}

export function fetchQuestionsSuccess(payload) {
    return { type: actionTypes.FETCH_ALL_SUCCESS, payload };
}

export function fetchQuestionsFailure(payload) {
    return { type: actionTypes.FETCH_ALL_FAILURE, payload, error: true };
}
