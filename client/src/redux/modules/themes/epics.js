import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';
import querystring from 'querystring';

import Api from '../../../lib/api';
import * as actionTypes from './actionTypes';
import * as actions from './actionCreators';

export function fetchTheme(action$) {
    return action$
        .ofType(actionTypes.FETCH_ONE)
        .map(action => action.payload)
        .switchMap(id =>
            Api.get(`/themes/${id}`, { auth: true })
                .map(response => actions.fetchThemeSuccess(response))
                .catch(error =>
                    Observable.of(actions.fetchThemeFailure(error.xhr.response))
                )
        );
}

export function fetchThemes(action$) {
    return action$
        .ofType(actionTypes.FETCH_ALL)
        .map(action => action.payload)
        .switchMap(params =>
            Api.get(`/themes?${querystring.stringify(params)}`, { auth: true })
                .map(response => actions.fetchThemesSuccess(response))
                .catch(error =>
                    Observable.of(
                        actions.fetchThemesFailure(error.xhr.response)
                    )
                )
        );
}

export function createTheme(action$) {
    return action$
        .ofType(actionTypes.CREATE)
        .map(action => action.payload)
        .switchMap(theme =>
            Api.post('/themes', theme, { auth: true })
                .map(response => actions.createThemeSuccess(response))
                .catch(error =>
                    Observable.of(
                        actions.createThemeFailure(error.xhr.response)
                    )
                )
        );
}

export function updateTheme(action$) {
    return action$
        .ofType(actionTypes.UPDATE)
        .map(action => action.payload)
        .switchMap(theme =>
            Api.put(`/themes/${theme.id}`, theme, { auth: true })
                .map(response => actions.updateThemeSuccess(response))
                .catch(error =>
                    Observable.of(
                        actions.updateThemeFailure(error.xhr.response)
                    )
                )
        );
}

export function deleteTheme(action$) {
    return action$
        .ofType(actionTypes.UPDATE)
        .map(action => action.payload)
        .switchMap(theme =>
            Api.delete(`/themes/${theme.id}`, { auth: true })
                .map(response => actions.deleteThemeSuccess(response))
                .catch(error =>
                    Observable.of(
                        actions.deleteThemeFailure(error.xhr.response)
                    )
                )
        );
}

export default combineEpics(
    fetchTheme,
    fetchThemes,
    createTheme,
    updateTheme,
    deleteTheme
);
