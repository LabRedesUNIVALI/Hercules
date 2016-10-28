(function () {

    'use strict';

    /**
     * TestAPIService - API service for test entities
     * @ngInject
     */
    function TestAPIService ($http) {

        var _save = function (test) {
            return  $http.post('/api/tests', test);
        };

        var _getAll = function () {
            return $http.get('/api/tests');
        };

        var _getById = function (id) {
            return $http.get('/api/tests/' + id);
        };

        var _update = function (id, test) {
            return $http.put('/api/tests/' + id, test);
        };

        var _delete = function (id) {
            return $http.delete('/api/tests/' + id);
        };

        return {
            save: _save,
            getAll: _getAll,
            getById: _getById,
            update: _update,
            delete: _delete
        };

    }

    angular.module('hercules.services')
        .factory('TestAPIService', TestAPIService);

})();
