angular.module('hercules').factory('accessTokenInterceptor', function ($cookies) {

    return {
        request: function (config) {
            var token = $cookies.get('accessToken');
            config.headers['Authorization'] = 'Bearer ' + token;
            return config;
        }
    };

});
