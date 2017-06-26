(function () {

    'use strict';

    /**
     * AuthenticationService - Service to handle login and logout.
     * @ngInject
     */
    function AuthenticationService($http, $cookies, $log) {

        var _adminLogin = function (credentials, callback) {
            $http.post('/api/auth', credentials)
                .then(function (response) {
                    if (response.data && response.data.token) {
                        $cookies.put('accessToken', response.data.token, {
                            path: '/admin'
                        });
                        callback(true);
                    } else {
                        callback(false);
                    }
                }, function (err) {
                    callback(false);
                });
        };

        var _studentLogin = function (credentials, callback) {
            var req = {
                url: '/api/student/test',
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + credentials.token
                }
            };
            $http(req)
                .then(function (response) {
                    if (response.data && response.data._id) {
                        $cookies.put('studentToken', credentials.token, {
                            path: '/student'
                        });
                        callback(true);
                    } else {
                        callback(false);
                    }
                }, function (err) {
                    callback(false);
                });
        };

        var _adminLogout = function (callback) {
            $http.delete('/api/auth')
                .then(function () {
                    $cookies.remove('accessToken', { path: '/admin' });
                    callback(true);
                } ,function () {
                    $cookies.remove('accessToken', { path: '/admin' });
                    callback(false);
                });
        };

        return {
            adminLogin: _adminLogin,
            adminLogout: _adminLogout,
            studentLogin: _studentLogin
        };

    }

    angular.module('hercules.services')
        .factory('AuthenticationService', AuthenticationService);

})();
