angular.module('hercules').controller('LoginController', function ($scope, AuthenticationService) {

    $scope.login = function (credentials) {

        AuthenticationService.login(credentials, function (success) {
            console.log(success);
        });

    };

});
