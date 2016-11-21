(function () {

    'use strict';

    /**
     * AuthenticationService - Service to handle login and logout.
     * @ngInject
     */
    function AuthenticationService($http, $cookies) {

        var _adminLogin = function (credentials, callback) {
            $http.post('/api/auth', credentials)
                .success(function (response) {
                    if (response.token) {
                        $cookies.put('accessToken', response.token);
                        callback(true);
                    } else {
                        callback(false);
                    }
                })
                .error(function (err) {
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
                .success(function (response) {
                    if (response._id) {
                        $cookies.put('studentToken', credentials.token, {
                            path: '/student'
                        })
                        callback(true);
                    } else {
                        callback(false);
                    }
                })
                .error(function () {
                    callback(false);
                });
        };

        var _adminLogout = function () {
            $cookies.remove('accessToken');
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
