angular.module('hercules').directive('compareTo', function () {
    return {
        strict: 'A',
        require: 'ngModel',
        scope: {
            originalValue: '=compareTo'
        },
        link: function ($scope, $element, $attrs, ngModel) {
            ngModel.$validators.compareTo = function(confirmValue) {
                return confirmValue == $scope.originalValue;
            };
            $scope.$watch("originalValue", function() {
                ngModel.$validate();
            });
        }
    }
});
