angular.module('hercules').controller('QuestionDetailController', function ($scope, $location, $routeParams, QuestionAPIService, $mdDialog) {

    QuestionAPIService.getById($routeParams.id)
        .success(function (result) {
            $scope.question = result;
        });


    $scope.delete = function (question, ev) {

        showConfirmDeleteDialog(ev).then(function () {

            QuestionAPIService.delete(question.theme._id, question._id)
                .success(function (result) {
                    $location.path('admin/questions');
                })
                .error(function () {
                    showGenericErrorDialog();
                });

        }, null);

    };

    var showConfirmDeleteDialog = function (ev) {

        var confirm = $mdDialog.confirm()
            .title('Deseja realmente excluir este registro?')
            .textContent('Você não poderá recuperá-lo mais tarde.')
            .targetEvent(ev)
            .ok('Sim')
            .cancel('Não');

        return $mdDialog.show(confirm);
    };

    var showGenericErrorDialog = function () {
        $mdDialog.show(
            $mdDialog.alert()
                .parent('body')
                .clickOutsideToClose(true)
                .title('Erro')
                .textContent('Ooops! Algo de errado aconteceu. Por favor, tente novamente.')
                .ok('Fechar')
        );
    };

});
