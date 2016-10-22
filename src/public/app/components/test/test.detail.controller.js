angular.module('hercules').controller('TestDetailController', [
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

        $scope.getQuestions($scope.entity.themes);

        $scope.delete = function (entity, ev) {

            hcCommonDialogs.confirmDelete(ev).then(function () {

                $scope.processing = true;

                TestAPIService.delete(entity._id)
                    .success(function (result) {
                        $location.path('admin/tests');
                    })
                    .error(function () {
                        hcCommonDialogs.genericError();
                    })
                    .then(function () {
                        $scope.processing = false;
                    });
            }, null);
        };

}]);
