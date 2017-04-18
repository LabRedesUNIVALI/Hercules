import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';
import querystring from 'querystring';

import Api from '../../../lib/api';
import * as actionTypes from './actionTypes';
import * as actions from './actionCreators';

export function fetchQuestion(action$) {
    return action$.ofType(actionTypes.FETCH_ONE)
        .map(action => action.payload)
        .switchMap(id =>
            Api.get(`/questions/${id}`, { auth: true })
                .map(response => actions.fetchQuestionSuccess(response))
                .catch(error => Observable.of(
                    actions.fetchQuestionFailure(error.xhr.response)
                ))
        );
}

export function fetchQuestions(action$) {
    return action$.ofType(actionTypes.FETCH_ALL)
        .map(action => action.payload)
        .switchMap(params =>
            Api.get(`/questions?${querystring.stringify(params)}`, { auth: true })
                .map(response => actions.fetchQuestionsSuccess(response))
                .catch(error => Observable.of(
                    actions.fetchQuestionsFailure(error.xhr.response)
                ))
        );
}

export function createQuestion(action$) {
    return action$.ofType(actionTypes.CREATE)
        .map(action => action.payload)
        .switchMap(question =>
            Api.post('/questions', question, { auth: true })
                .map(response => actions.createQuestionSuccess(response))
                .catch(error => Observable.of(
                    actions.createQuestionFailure(error.xhr.response)
                ))
        );
}

export function updateQuestion(action$) {
    return action$.ofType(actionTypes.UPDATE)
        .map(action => action.payload)
        .switchMap(question =>
            Api.put(`/questions/${question.id}`, question, { auth: true })
                .map(response => actions.updateQuestionSuccess(response))
                .catch(error => Observable.of(
                    actions.updateQuestionFailure(error.xhr.response)
                ))
        );
}

export function deleteQuestion(action$) {
    return action$.ofType(actionTypes.UPDATE)
        .map(action => action.payload)
        .switchMap(question =>
            Api.delete(`/questions/${question.id}`, { auth: true })
                .map(response => actions.deleteQuestionSuccess(response))
                .catch(error => Observable.of(
                    actions.deleteQuestionFailure(error.xhr.response)
                ))
        );
}

export default combineEpics(
    fetchQuestion,
    fetchQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion
);
