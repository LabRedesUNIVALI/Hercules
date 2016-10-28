(function () {

    'use strict';

    /**
     * @class QuestionIndexController
     * @classdesc Index controller for question entity
     * @ngInject
     */
    function QuestionIndexController (entities, QuestionAPIService,
        ThemeAPIService, hcCommonToasts, hcCommonDialogs,
        $mdDialog, $location) {

        var vm = this;

        var _init = function () {

            vm.entities = entities.data;
            vm.selected = [];
            vm.processing = false;

            vm.delete = _delete;
            vm.addQuestion = _addQuestion;
            vm.showNoThemesDialog = _showNoThemesDialog;

        };

        var _delete = function (entity, ev) {
            hcCommonDialogs.confirmDelete(ev).then(function () {

                vm.processing = true;

                QuestionAPIService.delete(entity.theme._id, entity._id)
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

        var _addQuestion = function (ev) {
            ThemeAPIService.getAll()
                .success(function (result) {
                    if (result.length > 0) {
                        $location.path('/admin/questions/new');
                    } else {
                        showNoThemesDialog(ev);
                    }
                });
        };

        var _showNoThemesDialog = function (ev) {
            $mdDialog.show(
                $mdDialog.alert()
                    .title('Não há conteúdos cadastrados!')
                    .textContent('Você deve cadastrar conteúdos para poder adicionar questões.')
                    .clickOutsideToClose(true)
                    .targetEvent(ev)
                    .ok('Entendi')
            );
        };

        _init();

    }

    angular.module('hercules.controllers')
        .controller('QuestionIndexController', QuestionIndexController);

})();
