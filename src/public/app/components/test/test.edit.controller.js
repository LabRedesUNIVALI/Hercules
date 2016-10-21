angular.module('hercules').controller('TestEditController', [
    '$scope',
    'entity',
    'disciplines',
    'themes',
    'hcCommonDialogs',
    function ($scope, entity, disciplines, themes, hcCommonDialogs) {

        $scope.entity = entity.data;

        $scope.entity.beginDate = moment($scope.entity.beginDate).format('DD/MM/YYYY HH:mm');
        $scope.entity.endDate = moment($scope.entity.endDate).format('DD/MM/YYYY HH:mm');

        $scope.disciplines = disciplines.data;
        $scope.themes = themes.data;

        $scope.processing = false;

        $scope.selectedThemes = $scope.entity.themes.map(function () {

        });

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

        $scope.update = function (id, entity) {

            console.log(entity);

            $scope.processing = true;

            throw 'morra';

            ThemeAPIService.update(entity._id, updatedEntity)
                .success(function (result) {
                    if (result) {
                        $location.path('/admin/themes');
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
