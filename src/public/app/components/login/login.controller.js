angular.module('hercules').controller('LoginController', function ($scope, AuthenticationService, $location, $mdDialog) {

    var showIncorrectCredentialsDialog = function () {
        $mdDialog.show(
            $mdDialog.alert()
                .parent('body')
                .clickOutsideToClose(true)
                .title('Atenção!')
                .textContent('E-mail ou senha inválidos! Tente novamente.')
                .ok('Ok')
        );
    };

    $scope.login = function (credentials) {
        AuthenticationService.login(credentials, function (success) {
            if (success) {
                $location.path('/admin');
            } else {
                showIncorrectCredentialsDialog();
            }
        });
    };

});
