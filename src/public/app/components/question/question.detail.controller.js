angular.module('hercules').controller('QuestionDetailController', [
    '$scope',
    'entity',
    'QuestionAPIService',
    'hcCommonDialogs',
    '$location',
    function ($scope, entity, QuestionAPIService, hcCommonDialogs, $location) {

        $scope.entity = entity.data;
        $scope.processing = false;

        $scope.delete = function (entity, ev) {

            hcCommonDialogs.confirmDelete(ev).then(function () {

                $scope.processing = true;

                QuestionAPIService.delete(entity.theme._id, entity._id)
                    .success(function (result) {
                        $location.path('admin/questions');
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
