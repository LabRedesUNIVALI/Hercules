import { Observable } from 'rxjs/Observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { combineEpics } from 'redux-observable';

import * as actionTypes from './actionTypes';
import * as disciplineActions from './actionCreators';

export function createDiscipline(action$) {
    return action$.ofType(actionTypes.CREATE)
        .map(action => action.payload)
        .switchMap(discipline =>
            ajax.post(`/api/disciplines`, discipline)
                .map(response => disciplineActions.createDisciplineSuccess(response))
                .catch(error => Observable.of(
                    disciplineActions.createDisciplineFailure(error.xhr.response)
                ))
        );
}

export default combineEpics(
    createDiscipline
);
