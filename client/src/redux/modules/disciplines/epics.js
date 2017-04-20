import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';
import querystring from 'querystring';

import Api from '../../../lib/api';
import * as actionTypes from './actionTypes';
import * as actions from './actionCreators';

export function fetchDiscipline(action$) {
    return action$
        .ofType(actionTypes.FETCH_ONE)
        .map(action => action.payload)
        .switchMap(id =>
            Api.get(`/disciplines/${id}`, { auth: true })
                .map(response => actions.fetchDisciplineSuccess(response))
                .catch(error =>
                    Observable.of(
                        actions.fetchDisciplineFailure(error.xhr.response)
                    )
                )
        );
}

export function fetchDisciplines(action$) {
    return action$
        .ofType(actionTypes.FETCH_ALL)
        .map(action => action.payload)
        .switchMap(params =>
            Api.get(`/disciplines?${querystring.stringify(params)}`, {
                auth: true
            })
                .map(response => actions.fetchDisciplinesSuccess(response))
                .catch(error =>
                    Observable.of(
                        actions.fetchDisciplinesFailure(error.xhr.response)
                    )
                )
        );
}

export function createDiscipline(action$) {
    return action$
        .ofType(actionTypes.CREATE)
        .map(action => action.payload)
        .switchMap(discipline =>
            Api.post('/disciplines', discipline, { auth: true })
                .map(response => actions.createDisciplineSuccess(response))
                .catch(error =>
                    Observable.of(
                        actions.createDisciplineFailure(error.xhr.response)
                    )
                )
        );
}

export function updateDiscipline(action$) {
    return action$
        .ofType(actionTypes.UPDATE)
        .map(action => action.payload)
        .switchMap(discipline =>
            Api.put(`/disciplines/${discipline.id}`, discipline, { auth: true })
                .map(response => actions.updateDisciplineSuccess(response))
                .catch(error =>
                    Observable.of(
                        actions.updateDisciplineFailure(error.xhr.response)
                    )
                )
        );
}

export function deleteDiscipline(action$) {
    return action$
        .ofType(actionTypes.UPDATE)
        .map(action => action.payload)
        .switchMap(discipline =>
            Api.delete(`/disciplines/${discipline.id}`, { auth: true })
                .map(response => actions.deleteDisciplineSuccess(response))
                .catch(error =>
                    Observable.of(
                        actions.deleteDisciplineFailure(error.xhr.response)
                    )
                )
        );
}

export default combineEpics(
    fetchDiscipline,
    fetchDisciplines,
    createDiscipline,
    updateDiscipline,
    deleteDiscipline
);
