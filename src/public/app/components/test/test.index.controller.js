(function () {

    'use strict';

    /**
     * @class TestIndexController
     * @classdesc Index controller for test entities
     * @ngInject
     */
    function TestIndexController (entities, TestAPIService, hcCommonDialogs,
        hcCommonToasts, hcPDFManager, $mdDialog) {

        var vm = this;

        var _init = function () {

            vm.entities = entities.data;
            vm.selected = [];
            vm.processing = false;

            vm.delete = _delete;
            vm.previewTest = _previewTest;
            vm.downloadPdf = _downloadPdf;
            vm.printPdf = _printPdf;

        };

        var _delete = function (entity, ev) {
            hcCommonDialogs.confirmDelete(ev).then(function () {
                vm.processing = true;
                TestAPIService.delete(entity._id)
                    .success(function () {
                        var index = vm.entities.indexOf(entity);
                        vm.entities.splice(index, 1);
                        hcCommonToasts.notice("Registro excluído com sucesso.");
                    })
                    .error(function () {
                        hcCommonToasts.notice("Não foi possível excluir o registro");
                    })
                    .then(function () {
                        vm.processing = false;
                    });
            }, null);
        };

        var _previewTest = function (test, ev) {
            $mdDialog.show({
                templateUrl: 'public/components/test/test.dialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                controller: 'TestDialogController',
                controllerAs: 'vm',
                locals: { test: test }
            });
        };

        var _downloadPdf = function (test) {
            hcPDFManager.generateTestDocument(test, false);
        };

        var _printPdf = function (test) {
            hcPDFManager.generateTestDocument(test, true);
        };

        _init();

    }

    angular.module('hercules.controllers')
        .controller('TestIndexController', TestIndexController);

})();
