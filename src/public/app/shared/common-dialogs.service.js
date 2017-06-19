(function () {

    'use strict';

    /**
     * CommonDialogs - Service to display common dialogs
     * @ngInject
     */
    function CommonDialogs($mdDialog) {

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
                templateUrl: 'question/question.dialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                controller: 'QuestionDialogController',
                controllerAs: 'vm',
                locals: { question: question }
            });
        };

    }

    angular.module('hercules.services')
        .service('CommonDialogs', CommonDialogs);

})();
