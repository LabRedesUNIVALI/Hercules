angular.module('hercules').controller('ThemeNewController', [
    '$scope',
    'ThemeAPIService',
    'hcCommonDialogs',
    '$location',
    function ($scope, ThemeAPIService, hcCommonDialogs, $location) {

        $scope.processing = false;

        $scope.save = function (entity) {
            $scope.processing = true;
            ThemeAPIService.save(entity)
                .success(function (result) {
                    if (result) {
                        $location.path('admin/themes');
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
