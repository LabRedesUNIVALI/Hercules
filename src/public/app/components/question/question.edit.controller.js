angular.module('hercules').controller('QuestionEditController', [
    '$scope',
    'entity',
    'themes',
    'QuestionAPIService',
    'hcCommonDialogs',
    '$location',
    function ($scope, entity, themes, QuestionAPIService, hcCommonDialogs, $location) {

        $scope.entity = entity.data;
        $scope.processing = false;

        $scope.themes = themes.data.map(function (theme) {
            return {
                _id: theme._id,
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

        $scope.update = function (entity) {

            $scope.processing = true;

            var updatedEntity = {
                name: entity.name,
                correctOption: entity.correctOption,
                options: entity.options.map(function (option) {
                    return {
                        text: option.text
                    }
                })
            };

            QuestionAPIService.update(entity.theme._id, entity._id, updatedEntity)
                .success(function (result) {
                    if (result) {
                        $location.path('/admin/questions');
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
