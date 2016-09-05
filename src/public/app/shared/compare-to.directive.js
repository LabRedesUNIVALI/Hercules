angular.module('hercules').directive('compareTo', function () {
    return {
        strict: 'A',
        require: 'ngModel',
        scope: {
            originalValue: '=compareTo'
        },
        link: function ($scope, $element, $attrs, ngModel) {
            ngModel.$validators.compareTo = function(comparedValue) {
                return comparedValue == $scope.originalValue;
            };
            $scope.$watch("originalValue", function() {
                ngModel.$validate();
            });
        }
    }
});
