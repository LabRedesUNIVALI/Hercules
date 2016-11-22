(function () {

    'use strict';

    /**
     * @class ThemeIndexController
     * @classdesc Index controller for theme entities
     * @ngInject
     */
    function ThemeIndexController (entities, ThemeAPIService,
        CommonToasts, CommonDialogs, $scope) {

        var vm = this;

        var _init = function () {

            vm.entities = entities.data;
            vm.selected = [];
            vm.processing = false;

            vm.delete = _delete;

            _setupListeners();

        };

        var _delete = function (entity, ev) {

            CommonDialogs.confirmDelete(ev).then(function () {

                vm.processing = true;

                ThemeAPIService.delete(entity._id)
                    .success(function () {
                        var index = vm.entities.indexOf(entity);
                        vm.entities.splice(index, 1);
                        CommonToasts.notice.success.Delete();
                        vm.processing = false;
                    })
                    .error(function () {
                        CommonToasts.notice.error.Delete();
                        vm.processing = false;
                    });
            }, null);
            
        };

        var _setupListeners = function () {
            $scope.$on('NEW', function () {
                CommonToasts.notice.success.New();
            });
            $scope.$on('UPDATE', function () {
                CommonToasts.notice.success.Update();
            });
        };

        _init();

    }

    angular.module('hercules.controllers')
        .controller('ThemeIndexController', ThemeIndexController);

})();
