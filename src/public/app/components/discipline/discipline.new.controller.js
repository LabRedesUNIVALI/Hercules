angular.module('hercules').controller('DisciplineNewController', function ($scope) {

    $scope.discipline = {};

    $scope.discipline.students = [];

    $scope.addStudentField = function () {
        $scope.discipline.students.push('');
    }



});
