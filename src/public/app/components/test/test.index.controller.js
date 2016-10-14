angular.module('hercules').controller('TestIndexController', [
    '$scope',
    'entities',
    function ($scope, entities) {

        $scope.entities = entities.data;
        $scope.selected = [];
}]);
