angular.module('hercules').controller('QuestionNewController', [
    '$scope',
    'themes',
    'QuestionAPIService',
    '$location',
    function ($scope, themes, QuestionAPIService, $location) {

        $scope.entity = {};

        $scope.entity.options = [
            {text: ''},
            {text: ''},
            {text: ''},
            {text: ''},
            {text: ''}
        ];

        $scope.processing = false;

        $scope.themes = themes.data.map(function (theme) {
            return {
                id: theme._id,
                name: theme.name
            }
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

        $scope.save = function (entity) {

            $scope.processing = true;

            var themeId = entity.theme.id;
            delete entity.theme;

            QuestionAPIService.save(themeId, entity)
                .success(function (result) {
                    if (result) {
                        $location.path("admin/question/" + result._id);
                    } else {
                        hcCommonDialogs.genericError();
                    }
                })
                .error(function () {
                    hcCommonDialogs.genericError();
                })
                .then(function () {
                    $scope.processing = false;
                });
        };
}]);
