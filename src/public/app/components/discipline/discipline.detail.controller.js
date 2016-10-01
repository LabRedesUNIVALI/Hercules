angular.module('hercules').controller('DisciplineDetailController', [
    '$scope',
    'entity',
    'DisciplineAPIService',
    'hcCommonDialogs',
    '$location',
    function ($scope, entity, DisciplineAPIService, hcCommonDialogs, $location) {

        $scope.entity = entity.data;
        $scope.processing = false;

        $scope.delete = function (entity, ev) {
            hcCommonDialogs.confirmDelete(ev).then(function () {

                $scope.processing = true;

                DisciplineAPIService.delete(entity._id)
                    .success(function (result) {
                        $location.path('admin/disciplines')
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

