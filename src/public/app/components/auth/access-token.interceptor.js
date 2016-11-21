(function () {

    'use strict';

    /**
     * accessTokenInterceptor - Interceptor to append jwt to Authorization header
     * @ngInject
     */
    function AccessTokenInterceptor ($cookies) {

        return {
            request: function (config) {
                if (config.url.includes('/api')) {

                    var token = $cookies.get('accessToken');
                    
                    if (config.url.includes('/api/student')) {
                        token = $cookies.get('studentToken');
                    }

                    if (token) {
                        config.headers.Authorization = 'Bearer ' + token;
                    }

                }
                
                return config;
            }
        };

    }

    angular.module('hercules.services')
        .factory('AccessTokenInterceptor', AccessTokenInterceptor);

})();
