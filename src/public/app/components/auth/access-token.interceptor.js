angular.module('hercules').factory('accessTokenInterceptor', [
    '$cookies',
    function ($cookies) {

        return {
            request: function (config) {
                var token = $cookies.get('accessToken');
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
                return config;
            }
        };
}]);
