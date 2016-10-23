angular.module('hercules').controller('QuestionDialogController', [
    '$scope',
    'question',
    '$mdDialog',
    function ($scope, question, $mdDialog) {
        $scope.question = question;
        $scope.close = function () {
            $mdDialog.cancel();
        };
}]);
