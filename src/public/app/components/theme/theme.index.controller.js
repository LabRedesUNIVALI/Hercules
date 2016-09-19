angular.module('hercules').controller('ThemeIndexController', function ($scope, ThemeAPIService) {

    ThemeAPIService.getAll().success(function (data) {
        $scope.themes = data;
    });

});
