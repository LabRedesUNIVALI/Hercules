angular.module('hercules').factory('UserAPIService', [
    '$http',
    function ($http) {

        var _createUser = function (user) {
            return $http.post('/api/register', user);
        };

        var _checkEmail = function(email) {
            return $http.post('/api/email/check', email);
        };

        var _getProfile = function() {
            return $http.get('/api/profile/me');
        };

        return {
            createUser: _createUser,
            checkEmail: _checkEmail,
            getProfile: _getProfile
        };
}]);
