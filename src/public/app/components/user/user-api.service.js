angular.module('hercules').factory('UserAPIService', function ($http) {

    var _createUser = function (user) {
        return $http.post('/api/register', user);
    };

    var _checkEmail = function(email) {
        return $http.post('/api/email/check', email);
    };

    return {
        createUser: _createUser,
        checkEmail: _checkEmail
    };

});
