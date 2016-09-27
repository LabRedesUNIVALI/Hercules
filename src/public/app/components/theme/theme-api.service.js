angular.module('hercules').factory('ThemeAPIService', [
    '$http',
    function ($http) {

        var _save = function (theme) {
            return $http.post('/api/themes', theme);
        };

        var _getAll = function () {
            return $http.get('/api/themes');
        };

        var _getById = function (id) {
            return $http.get('/api/themes/' + id);
        };

        var _update = function (id, theme) {
            return $http.put('/api/themes/' + id, theme);
        };

        var _delete = function (id) {
            return $http.delete('/api/themes/' + id);
        };

        return {
            save: _save,
            getAll: _getAll,
            getById: _getById,
            update: _update,
            delete: _delete
        };
}]);
