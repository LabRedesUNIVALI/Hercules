angular.module('hercules').controller('ThemeNewController', function ($scope, $location, ThemeAPIService, $mdDialog) {

    $scope.save = function (theme) {
        ThemeAPIService.save(theme)
            .success(function (result) {
                if (result) {
                    $location.path('admin/themes');
                } else {
                    showGenericErrorDialog();
                }
            })
            .error(function () {
                showGenericErrorDialog();
            });
    };

    var showGenericErrorDialog = function () {
        $mdDialog.show(
            $mdDialog.alert()
                .parent('body')
                .clickOutsideToClose(true)
                .title('Erro')
                .textContent('Ooops! Algo de errado aconteceu. Por favor, tente novamente.')
                .ok('Fechar')
        );
    };

});