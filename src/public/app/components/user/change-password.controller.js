(function () {

    'use strict';

    /**
     * @class PasswordController
     * @classdesc Controller for changing user password
     * @ngInject
     */
    function PasswordController () {

        var vm = this;

        var _init = function () {

            vm.processing = false;

        };

        _init();

    }

    angular.module('hercules.controllers')
        .controller('PasswordController', PasswordController);

})();
