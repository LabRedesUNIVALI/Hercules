angular.module('hercules').controller('ProfileController', [
    '$scope',
    'entity',
    function ($scope, entity) {

        $scope.entity = entity.data;

}]);
