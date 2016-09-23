angular.module('hercules').controller('ThemeIndexController', function ($scope, ThemeAPIService, $mdToast, $mdDialog) {

    $scope.selected = [];

    $scope.delete = function (theme, ev) {

        showConfirmDeleteDialog(ev).then(function () {

            ThemeAPIService.delete(theme._id)
                .success(function () {
                    getThemes();
                    showToast("Registro excluído com sucesso.");
                })
                .error(function () {
                    showToast("Não foi possível excluir o registro");
                });
            
        }, null);
    };

    var getThemes = function () {
        ThemeAPIService.getAll()
            .success(function (result) {
                $scope.themes = result;
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

    getThemes();

});
