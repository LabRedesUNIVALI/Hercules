import { Observable } from 'rxjs/Observable';
import { ajax } from 'rxjs/observable/dom/ajax';
import { combineEpics } from 'redux-observable';
import querystring from 'querystring';

import * as actionTypes from './actionTypes';
import * as themeActions from './actionCreators';

export function fetchTheme(action$) {
    return action$.ofType(actionTypes.FETCH_ONE)
        .map(action => action.payload)
        .switchMap(id =>
            ajax.getJSON(`/api/themes/${id}`)
                .map(response => themeActions.fetchThemeSuccess(response))
                .catch(error => Observable.of(
                    themeActions.fetchThemeFailure(error.xhr.response)
                ))
        );
}

export function fetchThemes(action$) {
    return action$.ofType(actionTypes.FETCH_ALL)
        .map(action => action.payload)
        .switchMap(params =>
            ajax.getJSON(`/api/themes?${querystring.stringify(params)}`)
                .map(response => themeActions.fetchThemesSuccess(response))
                .catch(error => Observable.of(
                    themeActions.fetchThemesFailure(error.xhr.response)
                ))
        );
}

export function createTheme(action$) {
    return action$.ofType(actionTypes.CREATE)
        .map(action => action.payload)
        .switchMap(theme =>
            ajax.post(`/api/themes`, theme)
                .map(response => themeActions.createThemeSuccess(response))
                .catch(error => Observable.of(
                    themeActions.createThemeFailure(error.xhr.response)
                ))
        );
}

export function updateTheme(action$) {
    return action$.ofType(actionTypes.UPDATE)
        .map(action => action.payload)
        .switchMap(theme =>
            ajax.put(`/api/themes/${theme.id}`, theme)
                .map(response => themeActions.updateThemeSuccess(response))
                .catch(error => Observable.of(
                    themeActions.updateThemeFailure(error.xhr.response)
                ))
        );
}

export function deleteTheme(action$) {
    return action$.ofType(actionTypes.UPDATE)
        .map(action => action.payload)
        .switchMap(theme =>
            ajax.delete(`/api/themes/${theme.id}`)
                .map(response => themeActions.deleteThemeSucess(response))
                .catch(error => Observable.of(
                    themeActions.deleteThemeFailure(error.xhr.response)
                ))
        );
}

export default combineEpics(
    fetchTheme,
    fetchThemes,
    createTheme,
    updateTheme,
    deleteTheme
);
