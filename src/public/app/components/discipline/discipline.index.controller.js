(function () {

    'use strict';

    /**
     * @class DisciplineIndexController
     * @classdesc Index controller for discipline entities
     * @ngInject
     */
     function DisciplineIndexController (entities, DisciplineAPIService,
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

                 DisciplineAPIService.delete(entity._id)
                     .then(function (result) {
                         var index = vm.entities.indexOf(entity);
                         vm.entities.splice(index, 1);
                         CommonToasts.notice.success.Delete();
                         vm.processing = false;
                     }, function () {
                         CommonToasts.notice.error.Delete();
                         vm.processing = false;
                     });
             }, function() {});

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
        .controller('DisciplineIndexController', DisciplineIndexController);

})();
