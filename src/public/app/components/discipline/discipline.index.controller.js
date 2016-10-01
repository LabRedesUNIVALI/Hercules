angular.module('hercules').controller('DisciplineIndexController', [
    '$scope',
    'entities',
    'DisciplineAPIService',
    'hcCommonToasts',
    'hcCommonDialogs',
    function ($scope, entities, DisciplineAPIService, hcCommonToasts, hcCommonDialogs) {

        $scope.entities = entities.data;
        $scope.selected = [];
        $scope.processing = false;

        $scope.delete = function (entity, ev) {
            hcCommonDialogs.confirmDelete(ev).then(function () {

                $scope.processing = true;

                DisciplineAPIService.delete(entity._id)
                    .success(function (result) {
                        var index = $scope.entities.indexOf(entity);
                        $scope.entities.splice(index, 1);
                        hcCommonToasts.notice('Registro excluído com sucesso.');
                    })
                    .error(function () {
                        hcCommonToasts.notice('Não foi possível excluir o registro.')
                    })
                    .then(function () {
                        $scope.processing = false;
                    });
            }, null);
        };
}]);
