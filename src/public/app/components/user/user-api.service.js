(function () {

    'use strict';

    /**
     * UserAPIService - API service for user entitites
     * @ngInject
     */
    function UserAPIService ($http) {

        var _createUser = function (user) {
            return $http.post('/api/register', user);
        };

        var _checkEmail = function(email) {
            return $http.post('/api/email/check', email);
        };

        var _getProfile = function() {
            return $http.get('/api/profile/me');
        };

        var _changePassword = function (credentials) {
            return $http.put('/api/reset-password', credentials);
        };

        return {
            createUser: _createUser,
            checkEmail: _checkEmail,
            getProfile: _getProfile,
            changePassword: _changePassword
        };

    }

    angular.module('hercules.services')
        .factory('UserAPIService', UserAPIService);

})();
