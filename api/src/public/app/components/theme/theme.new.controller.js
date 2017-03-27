(function () {

    'use strict';

    /**
     * @class ThemeNewController
     * @classdesc New controller for theme entity
     * @ngInject
     */
    function ThemeNewController (CRUDService, CommonDialogs, $location) {

        var vm = this;

        var _init = function () {

            vm.processing = false;

            vm.save = _save;

        };

        var _save = function (entity) {

            vm.processing = true;

            CRUDService.save({
                entity: entity,
                serviceName: 'ThemeAPIService',
                desiredPath: '/admin/themes',
            }, function (success) {
                if (!success) {
                    vm.processing = false;
                    CommonDialogs.genericError();
                }
            });
            
        };

        _init();

    }

    angular.module('hercules.controllers')
        .controller('ThemeNewController', ThemeNewController);

})();
