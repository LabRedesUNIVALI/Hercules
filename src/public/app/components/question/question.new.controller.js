angular.module('hercules').controller('QuestionNewController', function ($timeout, $scope, ThemeAPIService, $mdDialog, QuestionAPIService) {

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

    // $scope.newTheme = function (ev) {
    //     showAddThemeDialog(ev);
    // };
    //
    // var showAddThemeDialog = function (ev) {
    //
    //     var prompt = $mdDialog.prompt()
    //         .parent(angular.element(document.body))
    //         .title('Adicionar conteúdo')
    //         .textContent('Informe o nome do conteúdo')
    //         .placeholder('Nome do conteúdo')
    //         .initialValue($scope.searchText)
    //         .targetEvent(ev)
    //         .ok('Adicionar')
    //         .cancel('Cancelar');
    //
    //     $mdDialog.show(prompt);
    //
    // }

});