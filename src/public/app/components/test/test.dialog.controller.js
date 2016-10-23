angular.module('hercules').controller('TestDialogController', [
    '$scope',
    'test',
    '$mdDialog',
    function ($scope, test, $mdDialog) {
        $scope.test = test;
        $scope.letters = ['a', 'b', 'c', 'd', 'e'];
        $scope.close = function () {
            $mdDialog.cancel();
        };
}]);
