(function () {

    'use strict';

    /**
     * @class ThemeEditController
     * @classdesc Edit controller for theme entity
     * @ngInject
     */
    function ThemeEditController (entity, CRUDService,
        CommonDialogs, $location) {

        var vm = this;

        var _init = function () {

            vm.entity = entity.data;
            vm.processing = false;

            vm.update = _update;

        };

        var _update = function (entity) {

            vm.processing = true;

            var updatedEntity = {
                name: entity.name
            };

            CRUDService.update({
                id: entity._id,
                entity: updatedEntity,
                serviceName: 'ThemeAPIService',
                desiredPath: '/admin/themes'
            }, function (success) {
                if (!success) {
                    CommonDialogs.genericError();
                    vm.processing = false;
                }    
            });

        };

        _init();

    }

    angular.module('hercules.controllers')
        .controller('ThemeEditController', ThemeEditController);

})();
