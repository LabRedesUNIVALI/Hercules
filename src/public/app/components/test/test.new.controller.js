angular.module('hercules').controller('TestNewController', [
    '$scope',
    'disciplines',
    'themes',
    'TestAPIService',
    'QuestionAPIService',
    'hcCommonDialogs',
    '$location',
    function ($scope, disciplines, themes, TestAPIService, QuestionAPIService, hcCommonDialogs, $location) {

        $scope.disciplines = disciplines.data;
        $scope.themes = themes.data;

        $scope.entity = {};
        $scope.entity.questions = [];

        $scope.processing = false;

        $scope.themeSearchTerm;

        $scope.selectedThemes = [];
        $scope.questions = [];
        var lastSearch = [];

        $scope.getQuestions = function (themes) {

            var equal = (themes.length === lastSearch.length) && lastSearch.every(function (item, index) {
                return item === themes[index];
            });


            if (!equal) {

                $scope.questions = [];

                themes.forEach(function (item) {

                    QuestionAPIService.getAllByTheme(item)
                        .success(function (result) {
                            $scope.questions = $scope.questions.concat(result);
                        })
                        .error(function () {
                            hcCommonDialogs.genericError();
                        });

                });

                lastSearch = themes;
            }

        };

        $scope.toggleQuestion = function (item, list) {
            var index = list.indexOf(item);
            if (index > -1) {
                list.splice(index, 1);
            }
            else {
                list.push(item);
            }
        };


        $scope.save = function (entity) {

            $scope.processing = true;

            entity = angular.copy(entity);

            TestAPIService.save(entity)
                .success(function (result) {
                    if (result) {
                        $location.path('admin/tests');
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

        }

}]);
