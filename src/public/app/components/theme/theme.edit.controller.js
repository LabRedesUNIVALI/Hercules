angular.module('hercules').controller('ThemeEditController', function ($scope, $routeParams,ThemeAPIService) {

    ThemeAPIService.getById($routeParams.id)
        .success(function (result) {
            $scope.theme = result;
        });

});
