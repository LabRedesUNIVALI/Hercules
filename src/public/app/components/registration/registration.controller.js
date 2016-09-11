angular.module('hercules').controller('RegistrationController', function ($scope, UserAPIService) {

    $scope.register = function(user) {
        UserAPIService.createUser(user).success(function(data){
            console.log(data);
        });
    };

});
