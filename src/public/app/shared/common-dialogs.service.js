(function () {

    'use strict';

    /**
     * hcCommonDialogs - Service to display common dialogs
     * @ngInject
     */
    function hcCommonDialogs($mdDialog) {

        this.genericError = function () {
            $mdDialog.show(
                $mdDialog.alert()
                    .parent('body')
                    .clickOutsideToClose(true)
                    .title('Erro')
                    .textContent('Ooops! Algo de errado aconteceu. Por favor, tente novamente.')
                    .ok('Fechar')
            );
        };

        this.confirmDelete = function (ev) {
            var confirm = $mdDialog.confirm()
                .title('Deseja realmente excluir este registro?')
                .textContent('Você não poderá recuperá-lo mais tarde.')
                .targetEvent(ev)
                .ok('Sim')
                .cancel('Não');
            return $mdDialog.show(confirm);
        };

        this.questionInfo = function (question, ev) {
            $mdDialog.show({
                templateUrl: 'public/components/question/question.dialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                controller: 'QuestionDialogController',
                locals: { question: question }
            });
        };

    };

    angular.module('hercules.services')
        .service('hcCommonDialogs', hcCommonDialogs);

})();
