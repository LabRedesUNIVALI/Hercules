angular.module('hercules').controller('DisciplineIndexController', function ($scope, DisciplineAPIService, $mdToast, $mdDialog) {

    $scope.selected = [];

    $scope.delete = function (discipline, ev) {

        showConfirmDeleteDialog(ev).then(function () {

            DisciplineAPIService.delete(discipline._id)
                .success(function (result) {
                    getDisciplines();
                    showToast('Registro excluído com sucesso.');
                })
                .error(function () {
                    showToast('Não foi possível excluir o registro.')
                });

        }, null);

    };

    var getDisciplines = function () {
        DisciplineAPIService.getAll().success(function (result) {
            $scope.disciplines = result;
        });
    };

    var showToast = function (message) {
        $mdToast.show(
            $mdToast.simple()
                .textContent(message)
                .position('right bottom')
                .hideDelay('2000')
        )
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

    getDisciplines();

});
