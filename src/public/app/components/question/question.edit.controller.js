angular.module('hercules').controller('QuestionEditController', function ($scope, $location, $routeParams, QuestionAPIService, ThemeAPIService, $mdDialog) {

    $scope.disabled = true;

    ThemeAPIService.getAll().success(function (result) {
        $scope.themes = result.map(function (theme) {
            return {
                id: theme._id,
                name: theme.name
            };
        });
    })
        .then(function () {
            $scope.disabled = false;
        });

    $scope.querySearch = function (query) {
        return results = query ? $scope.themes.filter(createFilterFor(query)) : $scope.themes;
    };

    var createFilterFor = function (query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(theme) {
            var lowercaseName = angular.lowercase(theme.name);
            return (lowercaseName.indexOf(lowercaseQuery) > -1);
        }
    };

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
