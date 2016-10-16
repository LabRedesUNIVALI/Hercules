angular.module('hercules').directive('hcAdminLayout', function () {

    return {
        scope: {},
        strict: 'E',
        transclude: true,
        templateUrl: 'public/components/layout/admin-layout.tmpl.html'
    };

});
