(function () {

    'use strict';

    /**
     * @class TokenDialogController
     * @classdesc Dialog controller for token entity
     * @ngInject
     */
    function TokenDialogController (tokens, test, $mdDialog, PDFManager) {

        var vm = this;

        var _init = function () {

            vm.tokens = tokens;
            vm.test = test;

            vm.close = _close;
            vm.downloadPdf = _downloadPdf;
            vm.printPdf = _printPdf;

        };

        var _close = function () {
            $mdDialog.cancel();
        };

        var _downloadPdf = function (testName, tokens) {
            PDFManager.generateTokensDocument(testName, tokens, false);
        };

        var _printPdf = function (testName, tokens) {
            PDFManager.generateTokensDocument(testName, tokens, true);
        };

        _init();

    }

    angular.module('hercules.controllers')
        .controller('TokenDialogController', TokenDialogController);

})();
