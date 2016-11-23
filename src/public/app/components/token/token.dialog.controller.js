(function () {

    'use strict';

    /**
     * @class TokenDialogController
     * @classdesc Dialog controller for token entity
     * @ngInject
     */
    function TokenDialogController (tokens, $mdDialog) {

        var vm = this;

        var _init = function () {

            vm.tokens = tokens;

            vm.close = _close;

        };

        var _close = function () {
            $mdDialog.cancel();
        };

        _init();

    }

    angular.module('hercules.controllers')
        .controller('TokenDialogController', TokenDialogController);

})();
