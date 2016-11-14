(function () {

    'use strict';

    /**
     * @class ProfileController
     * @classdesc Controller for user profile
     * @ngInject
     */
    function ProfileController (entity) {

        var vm = this;

        var _init = function () {

            vm.entity = entity.data;
            vm.processing = false;

        };

        _init();

    }

    angular.module('hercules.controllers')
        .controller('ProfileController', ProfileController);

})();
