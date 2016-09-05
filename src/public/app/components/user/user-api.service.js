angular.module('hercules').factory('userAPI', function ($http) {

    var _createUser = function (user) {
        return $http.post('/api/');
    };

    return {
        createUser: _createUser
    };

})
