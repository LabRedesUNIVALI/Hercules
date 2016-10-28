(function () {

    'use strict';

    /**
     * @class DisciplineIndexController
     * @classdesc Index controller for discipline entities
     * @ngInject
     */
     function DisciplineIndexController (entities, DisciplineAPIService,
         hcCommonToasts, hcCommonDialogs) {

         var vm = this;

         var _init = function () {

             vm.entities = entities.data;
             vm.selected = [];
             vm.processing = false;

             vm.delete = _delete;

         };

         var _delete = function (entity, ev) {

             hcCommonDialogs.confirmDelete(ev).then(function () {

                 vm.processing = true;

                 DisciplineAPIService.delete(entity._id)
                     .success(function (result) {
                         var index = vm.entities.indexOf(entity);
                         vm.entities.splice(index, 1);
                         hcCommonToasts.notice('Registro excluído com sucesso.');
                         vm.processing = false;
                     })
                     .error(function () {
                         hcCommonToasts.notice('Não foi possível excluir o registro.');
                         vm.processing = false;
                     });
             }, null);

         };

         _init();

     }

     angular.module('hercules.controllers')
        .controller('DisciplineIndexController', DisciplineIndexController);

})();
