angular.module('hercules').service('hcCommonDialogs', [
    '$mdDialog',
    function ($mdDialog) {

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
}]);
