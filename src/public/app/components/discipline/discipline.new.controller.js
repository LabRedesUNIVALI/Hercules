angular.module('hercules').controller('DisciplineNewController', function ($scope, $location,DisciplineAPIService, $mdDialog) {

    $scope.discipline = {};

    $scope.discipline.students = [
        {name: ''}
    ];

    $scope.addStudentField = function () {
        $scope.discipline.students.push({name: ''});
    };

    $scope.removeStudentField = function (index) {
        $scope.discipline.students.splice(index, 1);
    };

    $scope.save = function (discipline) {

        DisciplineAPIService.save(discipline)
            .success(function (result) {
                if (result) {
                    $location.path('/admin/disciplines');
                } else {
                    showGenericErrorDialog();
                }
            })
            .error(function () {
                showGenericErrorDialog();
            })

    };

    var showGenericErrorDialog = function () {
        $mdDialog.show(
            $mdDialog.alert()
                .parent('body')
                .clickOutsideToClose(true)
                .title('Erro')
                .textContent('Ooops! Algo de errado aconteceu. Por favor, tente novamente.')
                .ok('Fechar')
        );
    };




});
