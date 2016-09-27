angular.module('hercules').factory('AuthenticationService', [
    '$http',
    '$cookies',
    function ($http, $cookies) {

        var _login = function (credentials, callback) {
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

        var _logout = function () {
            $cookies.remove('accessToken');
        };

        return {
            login: _login,
            logout: _logout
        };
}]);
