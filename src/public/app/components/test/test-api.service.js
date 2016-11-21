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

        var _getByToken = function (token) {
            var req = {
                url: '/api/student/test',
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            };
            return $http(req);
        };

        var _saveQuestionAnswer = function (questionId, option) {
            return $http.put('/api/student/test/question/' + questionId, option);
        };

        var _finishTest = function (token) {
            var req = {
                url: '/api/student/test',
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            };
            return $http(req);
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
            getByToken: _getByToken,
            saveQuestionAnswer: _saveQuestionAnswer,
            finishTest: _finishTest,
            update: _update,
            delete: _delete
        };

    }

    angular.module('hercules.services')
        .factory('TestAPIService', TestAPIService);

})();
