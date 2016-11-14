(function () {

    'use strict';

    /**
     * @class ThemeEditController
     * @classdesc Edit controller for theme entity
     * @ngInject
     */
    function ThemeEditController (entity, ThemeAPIService,
        hcCommonDialogs, $location) {

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

            ThemeAPIService.update(entity._id, updatedEntity)
                .success(function (result) {
                    if (result) {
                        $location.path('/admin/themes');
                    } else {
                        hcCommonDialogs.genericError();
                        vm.processing = false;
                    }
                })
                .error(function () {
                    hcCommonDialogs.genericError();
                    vm.processing = false;
                });
        };

        _init();

    }

    angular.module('hercules.controllers')
        .controller('ThemeEditController', ThemeEditController);

})();
