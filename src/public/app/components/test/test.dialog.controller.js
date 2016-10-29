(function () {

    'use strict';

    /**
     * @class TestDialogController
     * @classdesc Dialog controller for test entity
     * @ngInject
     */
    function TestDialogController (test, hcPDFManager, $mdDialog) {

        var vm = this;

        var _init = function () {

            vm.test = test;
            vm.letters = ['a', 'b', 'c', 'd', 'e'];

            vm.close = _close;
            vm.downloadPdf = _downloadPdf;
            vm.printPdf = _printPdf;

        };

        var _close = function () {
            $mdDialog.cancel();
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
        .controller('TestDialogController', TestDialogController);

})();
