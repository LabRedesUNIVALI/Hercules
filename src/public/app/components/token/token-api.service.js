(function () {
    
    'use strict';

    /**
     * TokenAPIService - API service for token entities
     * @ngInject
     */
    function TokenAPIService ($http) {

        var _getAllByTest = function (testId) {
            return $http.get('/api/tests/' + testId + '/tokens');
        };

        var _getById = function (id) {
            return $http.get('/api/tokens/' + id);
        };

        return {
            getAllByTest: _getAllByTest,
            getById: _getById
        };

    }

    angular.module('hercules.services')
        .factory('TokenAPIService', TokenAPIService);

})();
