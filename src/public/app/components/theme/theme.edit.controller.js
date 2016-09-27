angular.module('hercules').controller('ThemeEditController', [
    '$scope',
    'entity',
    'ThemeAPIService',
    'hcCommonDialogs',
    '$location',
    function ($scope, entity, ThemeAPIService, hcCommonDialogs, $location) {

        $scope.entity = entity.data;
        $scope.processing = false;

        $scope.update = function (entity) {

            $scope.processing = true;

            var updatedEntity = {
                name: entity.name
            };

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
