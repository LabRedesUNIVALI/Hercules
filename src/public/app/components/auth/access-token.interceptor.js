(function () {

    'use strict';

    /**
     * accessTokenInterceptor - Interceptor to append jwt to Authorization header
     * @ngInject
     */
    function accessTokenInterceptor ($cookies) {

        return {
            request: function (config) {
                var token = $cookies.get('accessToken');
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
                return config;
            }
        };

    };

    angular.module('hercules.services')
        .factory('accessTokenInterceptor', accessTokenInterceptor);

})();
