angular.module('hercules').directive('hcCompareTo', function () {
    return {
        strict: 'A',
        require: 'ngModel',
        scope: {
            originalValue: '=hcCompareTo'
        },
        link: function (scope, element, attrs, ngModel) {
            ngModel.$validators.compareTo = function(comparedValue) {
                return comparedValue == scope.originalValue;
            };
            scope.$watch("originalValue", function() {
                ngModel.$validate();
            });
        }
    }
});
