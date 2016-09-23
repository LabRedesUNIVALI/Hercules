angular.module('hercules').factory('QuestionAPIService', function ($http) {

    var _save = function (themeId, question) {
        return $http.post('/api/themes/' + themeId + '/questions', question);
    };

    var _getAll = function () {
        return $http.get('/api/questions');
    };

    var _getById = function (id) {
        return $http.get('/api/questions/' + id);
    };

    var _getAllByTheme = function (themeId) {
        return $http.get('/api/themes/' + themeId + '/questions');
    };

    var _getByThemeAndId = function (themeId, id) {
        return $http.get('/api/themes/' + themeId + '/questions/' + id);
    };

    var _update = function (themeId, questionId, question) {
        return $http.put('/api/themes/' + themeId + '/questions/' + questionId, question);
    };

    var _delete = function (themeId, id) {
        return $http.delete('/api/themes/' + themeId + '/questions/' + id);
    };

    return {
        save: _save,
        getAll: _getAll,
        getById: _getById,
        getAllByTheme: _getAllByTheme,
        getByThemeAndId: _getByThemeAndId,
        update: _update,
        delete: _delete
    };

});
