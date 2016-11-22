(function () {

    'use strict';

    /**
     * @class TestIndexController
     * @classdesc Index controller for test entities
     * @ngInject
     */
    function TestIndexController (entities, TestAPIService, CommonDialogs,
        CommonToasts, PDFManager, $mdDialog, $scope) {

        var vm = this;

        var _init = function () {

            vm.entities = entities.data;
            vm.selected = [];
            vm.processing = false;

            vm.delete = _delete;
            vm.previewTest = _previewTest;
            vm.downloadPdf = _downloadPdf;
            vm.printPdf = _printPdf;

            _setupListeners();

        };

        var _delete = function (entity, ev) {
            CommonDialogs.confirmDelete(ev).then(function () {
                vm.processing = true;
                TestAPIService.delete(entity._id)
                    .success(function () {
                        var index = vm.entities.indexOf(entity);
                        vm.entities.splice(index, 1);
                        CommonToasts.notice.success.Delete();
                        vm.processing = false;
                    })
                    .error(function () {
                        CommonToasts.notice.success.Delete();
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
            PDFManager.generateTestDocument(test, false);
        };

        var _printPdf = function (test) {
            PDFManager.generateTestDocument(test, true);
        };

        var _setupListeners = function () {
            $scope.$on('NEW', function () {
                CommonToasts.notice.success.New();
            });
            $scope.$on('UPDATE', function () {
                CommonToasts.notice.success.Update();
            });
        };

        _init();

    }

    angular.module('hercules.controllers')
        .controller('TestIndexController', TestIndexController);

})();
