angular.module('hercules').controller('RegistrationController', function ($scope, UserAPIService, AuthenticationService, $location, $mdDialog) {

    var showGenericErrorDialog = function () {
        $mdDialog.show(
            $mdDialog.alert()
                .parent('body')
                .clickOutsideToClose(true)
                .title('Erro')
                .textContent('Ocorreu um erro durante o cadastro. Por favor, tente novamente.')
                .ok('Fechar')
        );
    };

    $scope.register = function(user) {
        UserAPIService.createUser(user)
            .success(function(response){
                if (response) {
                    AuthenticationService.login({ email: user.email, password: user.password }, function (success) {
                        $location.path('/admin');
                    });
                } else {
                    showGenericErrorDialog();
                }
            })
            .error(function (err) {
                showGenericErrorDialog();
            });
    };

});
