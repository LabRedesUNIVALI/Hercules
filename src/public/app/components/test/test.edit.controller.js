angular.module('hercules').controller('TestEditController', [
    '$scope',
    'entity',
    'disciplines',
    'themes',
    'TestAPIService',
    'QuestionAPIService',
    'hcCommonDialogs',
    '$location',
    function ($scope, entity, disciplines, themes, TestAPIService, QuestionAPIService, hcCommonDialogs, $location) {

        $scope.entity = entity.data;

        $scope.entity.beginDate = moment($scope.entity.beginDate).format('DD/MM/YYYY HH:mm');
        $scope.entity.endDate = moment($scope.entity.endDate).format('DD/MM/YYYY HH:mm');

        $scope.disciplines = disciplines.data;
        $scope.themes = themes.data;

        $scope.processing = false;

        $scope.entity.themes = $scope.entity.themes.map(function (theme){
            return theme._id;
        });

        $scope.entity.questions = $scope.entity.questions.map(function (question){
            return question._id;
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

        $scope.update = function (entity) {

            $scope.processing = true;
            var updatedEntity = {
                name: entity.name,
                beginDate: entity.beginDate,
                endDate: entity.endDate,
                themes: entity.themes,
                discipline: entity.discipline._id,
                questions: entity.questions
            };

            TestAPIService.update(entity._id, updatedEntity)
                .success(function (result) {
                    if (result) {
                        $location.path('/admin/tests');
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

        $scope.getQuestions($scope.entity.themes);

}]);
