angular.module('hercules').controller('RegistrationController', [
    '$scope',
    'UserAPIService',
    'AuthenticationService',
    'hcCommonDialogs',
    '$location',
    function ($scope, UserAPIService, AuthenticationService, hcCommonDialogs, $location) {

        $scope.processing = false;

        $scope.register = function(user) {

            $scope.processing = true;

            UserAPIService.createUser(user)
                .success(function(response){
                    if (response) {
                        AuthenticationService.login({ email: user.email, password: user.password }, function (success) {
                            $location.path('/admin');
                        });
                    } else {
                        hcCommonDialogs.genericError();
                    }
                })
                .error(function () {
                    hcCommonDialogs.genericError();
                })
                .then(function () {
                    $scope.processing = false;
                });
        };
}]);
