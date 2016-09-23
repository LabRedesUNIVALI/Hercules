angular.module('hercules').controller('ThemeEditController', function ($scope, $routeParams, $location, ThemeAPIService, $mdDialog) {

    ThemeAPIService.getById($routeParams.id)
        .success(function (result) {
            $scope.theme = result;
        });

    $scope.update = function (theme) {

        var updatedTheme = {
            name: theme.name
        };

        ThemeAPIService.update(theme._id, updatedTheme)
            .success(function (result) {
                if (result) {
                    $location.path('/admin/themes');
                } else {
                    showGenericErrorDialog();
                }
            })
            .error(function () {
                showGenericErrorDialog();
            })
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
