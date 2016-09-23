angular.module('hercules').controller('QuestionNewController', function ($scope, $location, ThemeAPIService, $mdDialog, QuestionAPIService) {

    $scope.question = {};
    $scope.question.options = [];

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

    $scope.save = function (question) {

        var themeId = question.theme.id;
        delete question.theme;

        QuestionAPIService.save(themeId, question)
            .success(function (result) {
                if (result) {
                    $location.path("admin/question/" + result._id);
                } else {
                    showGenericErrorDialog();
                }
            })
            .error(function () {
                showGenericErrorDialog();
            });
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
