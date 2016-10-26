(function () {

    'use strict';

    /**
     * hcCompareTo - Directive to compare two fields
     * @ngInject
     */
    function hcCompareTo () {

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
        };

    };

    angular.module('hercules.directives')
        .directive('hcCompareTo', hcCompareTo);

})();
