angular.module('hercules').controller('ThemeIndexController', [
    '$scope',
    'entities',
    'ThemeAPIService',
    'hcCommonToasts',
    'hcCommonDialogs',
    function ($scope, entities, ThemeAPIService, hcCommonToasts, hcCommonDialogs) {

        $scope.entities = entities.data;
        $scope.selected = [];

        $scope.delete = function (entity, ev) {
            hcCommonDialogs.confirmDelete(ev).then(function () {
                ThemeAPIService.delete(entity._id)
                    .success(function () {
                        var index = $scope.entities.indexOf(entity);
                        $scope.entities.splice(index, 1);
                        hcCommonToasts.notice("Registro excluído com sucesso.");
                    })
                    .error(function () {
                        hcCommonToasts.notice("Não foi possível excluir o registro");
                    });
            }, null);
        };

}]);
