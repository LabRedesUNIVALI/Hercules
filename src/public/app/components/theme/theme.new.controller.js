(function () {

    'use strict';

    /**
     * @class ThemeNewController
     * @classdesc New controller for theme entity
     * @ngInject
     */
    function ThemeNewController (ThemeAPIService, hcCommonDialogs, $location) {

        var vm = this;

        var _init = function () {

            vm.processing = false;

            vm.save = _save;

        };

        var _save = function (entity) {

            vm.processing = true;

            ThemeAPIService.save(entity)
                .success(function (result) {
                    if (result) {
                        $location.path('admin/themes');
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
        .controller('ThemeNewController', ThemeNewController);

})();
