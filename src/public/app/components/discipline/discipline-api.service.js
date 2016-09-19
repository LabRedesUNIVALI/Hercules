angular.module('hercules').factory('DisciplineAPIService', function ($http) {

    var _save = function (discipline) {
        return $http.post('/api/disciplines', discipline);
    };

    var _getAll = function () {
        return $http.get('/api/disciplines');
    };

    var _getById = function (id) {
        return $http.get('/api/disciplines/' + id);
    };

    var _update = function (discipline) {
        return $http.put('/api/disciplines/' + discipline.id, discipline);
    };

    var _delete = function (id) {
        return $http.delete('/api/disciplines/' + id);
    };

    return {
        save: _save,
        getAll: _getAll,
        getById: _getById,
        update: _update,
        delete: _delete
    };

});
