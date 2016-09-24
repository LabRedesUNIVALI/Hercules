angular.module('hercules').controller('DisciplineEditController', function ($scope, DisciplineAPIService,$location, $routeParams, $mdDialog) {

    DisciplineAPIService.getById($routeParams.id)
        .success(function (result) {
            $scope.discipline = result;
        });

    $scope.addStudentField = function () {
        $scope.discipline.students.push({name: ''});
    };

    $scope.removeStudentField = function (index) {
        $scope.discipline.students.splice(index, 1);
    };

    $scope.update = function (discipline) {

        var updatedDiscipline = {
            name: discipline.name,
            year: discipline.year,
            semester: discipline.semester,
            students: discipline.students.map(function (student) {
                return {
                    name: student.name
                }
            })
        };

        DisciplineAPIService.update(discipline._id, updatedDiscipline)
            .success(function (result) {
                if (result) {
                    $location.path('admin/disciplines');
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
