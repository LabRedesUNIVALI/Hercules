(function () {

    'use strict';

    /**
     * @class QuestionIndexController
     * @classdesc Index controller for question entity
     * @ngInject
     */
    function QuestionIndexController (entities, QuestionAPIService,
        ThemeAPIService, CommonToasts, CommonDialogs,
        $mdDialog, $location, $scope) {

        var vm = this;

        var _init = function () {

            vm.entities = entities.data;
            vm.selected = [];
            vm.processing = false;

            vm.delete = _delete;
            vm.addQuestion = _addQuestion;
            vm.showNoThemesDialog = _showNoThemesDialog;

            _setupListeners();

        };

        var _delete = function (entity, ev) {
            CommonDialogs.confirmDelete(ev).then(function () {

                vm.processing = true;

                QuestionAPIService.delete(entity.theme._id, entity._id)
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

        var _addQuestion = function (ev) {
            ThemeAPIService.getAll()
                .then(function (result) {
                    if (result.data && result.data.length > 0) {
                        $location.path('/admin/questions/new');
                    } else {
                        _showNoThemesDialog(ev);
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
        .controller('QuestionIndexController', QuestionIndexController);

})();
