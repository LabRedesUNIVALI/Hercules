angular.module('hercules').controller('TestIndexController', [
    '$scope',
    'entities',
    'TestAPIService',
    'hcCommonDialogs',
    'hcCommonToasts',
    'hcPDFManager',
    '$mdDialog',
    function ($scope, entities, TestAPIService, hcCommonDialogs, hcCommonToats, hcPDFManager, $mdDialog) {

        $scope.entities = entities.data;
        $scope.selected = [];
        $scope.processing = false;

         $scope.delete = function (entity, ev) {
            hcCommonDialogs.confirmDelete(ev).then(function () {
                $scope.processing = true;
                TestAPIService.delete(entity._id)
                    .success(function () {
                        var index = $scope.entities.indexOf(entity);
                        $scope.entities.splice(index, 1);
                        hcCommonToasts.notice("Registro excluído com sucesso.");
                    })
                    .error(function () {
                        hcCommonToasts.notice("Não foi possível excluir o registro");
                    })
                    .then(function () {
                        $scope.processing = false;
                    });
            }, null);
        };

        $scope.previewTest = function (test, ev) {
            $mdDialog.show({
                templateUrl: 'public/components/test/test.dialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                controller: 'TestDialogController',
                locals: { test: test }
            });
        };

        $scope.downloadPdf = function (test) {
            hcPDFManager.generateTestDocument(test, false);
        };

        $scope.printPdf = function (test) {
            hcPDFManager.generateTestDocument(test, true);
        };

}]);
