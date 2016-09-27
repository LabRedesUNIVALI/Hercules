angular.module('hercules').directive('hcUniqueEmail', [
    'UserAPIService',
    function (UserAPIService) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                element.bind('blur', function () {
                    scope.$apply(function () {
                        UserAPIService.checkEmail({ email: ngModel.$viewValue }).then(function (response) {
                            ngModel.$setValidity('uniqueEmail', response.data.isUnique);
                            return ngModel.$viewValue;
                        });
                    });
                });
            }
        };
}]);
