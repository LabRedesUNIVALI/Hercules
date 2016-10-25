angular.module('hercules').controller('TestDialogController', [
    '$scope',
    'test',
    'hcPDFManager',
    '$mdDialog',
    function ($scope, test, hcPDFManager, $mdDialog) {

        $scope.test = test;

        $scope.letters = ['a', 'b', 'c', 'd', 'e'];

        $scope.close = function () {
            $mdDialog.cancel();
        };

        $scope.downloadPdf = function (test) {
            hcPDFManager.generateTestDocument(test, false);
        };

        $scope.printPdf = function (test) {
            hcPDFManager.generateTestDocument(test, true);
        }

}]);
