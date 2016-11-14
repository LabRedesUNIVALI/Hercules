(function () {

    'use strict';

    /**
     * @class QuestionDialogController
     * @classdesc Dialog controller form question entity
     * @ngInject
     */
    function QuestionDialogController (question, $mdDialog) {

        var vm = this;

        var _init = function () {

            vm.question = question;

            vm.close = _close;

        };

        var _close = function () {
            $mdDialog.cancel();
        };

        _init();

    }

    angular.module('hercules.controllers')
        .controller('QuestionDialogController', QuestionDialogController);

})();
