angular.module('hercules').controller('DisciplineDetailController', function ($scope, DisciplineAPIService,$location, $routeParams, $mdDialog) {

    DisciplineAPIService.getById($routeParams.id)
        .success(function (result) {
            $scope.discipline = result;
        });

    $scope.delete = function (discipline, ev) {

        showConfirmDeleteDialog(ev).then(function () {

            DisciplineAPIService.delete(discipline._id)
                .success(function (result) {
                    $location.path('admin/disciplines')
                })
                .error(function () {
                    showGenericErrorDialog();
                });

        }, null);

    };

    var showConfirmDeleteDialog = function (ev) {

        var confirm = $mdDialog.confirm()
            .title('Deseja realmente excluir este registro?')
            .textContent('Você não poderá recuperá-lo mais tarde.')
            .targetEvent(ev)
            .ok('Sim')
            .cancel('Não');

        return $mdDialog.show(confirm);
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

