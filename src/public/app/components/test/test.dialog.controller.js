(function () {

    'use strict';

    /**
     * @class TestDialogController
     * @classdesc Dialog controller for test entity
     * @ngInject
     */
    function TestDialogController (test, hcPDFManager, $mdDialog) {

        var vm = this;

        var init = function () {

            vm.test = test;
            vm.letters = ['a', 'b', 'c', 'd', 'e'];

            vm.close = close;
            vm.downloadPdf = downloadPdf;
            vm.printPdf = printPdf;

        };

        var close = function () {
            $mdDialog.cancel();
        };

        var downloadPdf = function (test) {
            hcPDFManager.generateTestDocument(test, false);
        };

        var printPdf = function (test) {
            hcPDFManager.generateTestDocument(test, true);
        };

        init();

    };

    angular.module('hercules.controllers')
        .controller('TestDialogController', TestDialogController);

})();
