angular.module('hercules').controller('DisciplineEditController', [
    '$scope',
    'entity',
    'DisciplineAPIService',
    'hcCommonDialogs',
    '$location',
    function ($scope, entity, DisciplineAPIService, hcCommonDialogs, $location) {

        $scope.entity = entity;
        $scope.processing = false;

        $scope.addStudentField = function () {
            $scope.entity.students.push({name: ''});
        };

        $scope.removeStudentField = function (index) {
            $scope.entity.students.splice(index, 1);
        };

        $scope.update = function (entity) {

            $scope.processing = true;

            var updatedEntity = {
                name: entity.name,
                year: entity.year,
                semester: entity.semester,
                students: entity.students.map(function (student) {
                    return {
                        name: student.name
                    }
                })
            };

            DisciplineAPIService.update(entity._id, updatedEntity)
                .success(function (result) {
                    if (result) {
                        $location.path('admin/disciplines');
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
