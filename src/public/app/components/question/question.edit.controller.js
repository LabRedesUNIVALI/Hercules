angular.module('hercules').controller('QuestionEditController', function ($scope, $location, $routeParams, QuestionAPIService, $mdDialog) {

    QuestionAPIService.getById($routeParams.id)
        .success(function (result) {
            $scope.question = result;
        });

    $scope.update = function (question) {

        var updatedQuestion = {
            name: question.name,
            correctOption: question.correctOption,
            options: question.options.map(function (option) {
                return {
                    text: option.text
                }
            })
        };

        QuestionAPIService.update(question.theme._id, question._id, updatedQuestion)
            .success(function (result) {
                if (result) {
                    $location.path('/admin/questions');
                } else {
                    showGenericErrorDialog();
                }
            })
            .error(function () {
                showGenericErrorDialog();
            })
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