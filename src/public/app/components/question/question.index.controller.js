angular.module('hercules').controller('QuestionIndexController', function ($scope, $location, QuestionAPIService, ThemeAPIService, $mdToast, $mdDialog) {

    $scope.selected = [];

    var getQuestions = function () {
        QuestionAPIService.getAll().success(function (result) {
            $scope.questions = result;
        });
    };
    
    $scope.delete = function (question, ev) {

        showConfirmDeleteDialog(ev).then(function () {

            QuestionAPIService.delete(question.theme._id, question._id)
                .success(function (result) {
                    getQuestions();
                    showToast('Registro excluído com sucesso.');
                })
                .error(function () {
                    showToast('Não foi possível excluir o registro.')
                });

        });

    };

    $scope.addQuestion = function (ev) {

        ThemeAPIService.getAll()
            .success(function (result) {
                if (result.length > 0) {
                    $location.path('/admin/questions/new');
                } else {
                    showNoThemesDialog(ev);
                }
            });

    };
    
    var showToast = function (message) {
        $mdToast.show(
            $mdToast.simple()
                .textContent(message)
                .position('right bottom')
                .hideDelay('2000')
        )
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

    var showNoThemesDialog = function (ev) {

        $mdDialog.show(
            $mdDialog.alert()
                .title('Não há conteúdos cadastrados!')
                .textContent('Você deve cadastrar conteúdos para poder adicionar questões.')
                .clickOutsideToClose(true)
                .targetEvent(ev)
                .ok('Entendi')
        );
    };

    getQuestions();

});