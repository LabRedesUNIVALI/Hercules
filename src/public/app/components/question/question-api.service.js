angular.module('hercules').factory('QuestionAPIService', function ($http) {

    var _save = function (themeId, question) {
        return $http.post('/api/themes/' + themeId + '/questions', question);
    };

    var _getAll = function (themeId) {
        return $http.get('/api/themes/' + themeId + '/questions');
    };

    var _getById = function (themeId, id) {
        return $http.get('/api/themes/' + themeId + '/questions/' + id);
    };

    var _update = function (themeId, question) {
        return $http.put('/api/theme' + themeId + '/questions/' + question.id, question);
    };

    var _delete = function (themeId, id) {
        return $http.delete('/api/themes/' + themeId + '/questions/' + id);
    };

    return {
        save: _save,
        getAll: _getAll,
        getById: _getById,
        update: _update,
        delete: _delete
    };

});
