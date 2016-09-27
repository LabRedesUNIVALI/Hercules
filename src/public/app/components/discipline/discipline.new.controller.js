angular.module('hercules').controller('DisciplineNewController', [
    '$scope',
    'DisciplineAPIService',
    'hcCommonDialogs',
    '$location',
    function ($scope, DisciplineAPIService, hcCommonDialogs, $location) {

        $scope.entity = {};

        $scope.entity.students = [
            {name: ''}
        ];

        $scope.processing = false;

        $scope.addStudentField = function () {
            $scope.entity.students.push({name: ''});
        };

        $scope.removeStudentField = function (index) {
            $scope.entity.students.splice(index, 1);
        };

        $scope.save = function (entity) {

            $scope.processing = true;

            DisciplineAPIService.save(entity)
                .success(function (result) {
                    if (result) {
                        $location.path('/admin/disciplines');
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
