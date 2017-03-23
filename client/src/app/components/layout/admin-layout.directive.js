(function () {

    'use strict';

    /**
     * hcAdminLayout - Directive to display layout used in admin pages
     */
    function hcAdminLayout () {

        return {
            scope: {},
            strict: 'E',
            transclude: true,
            templateUrl: 'public/components/layout/admin-layout.tmpl.html'
        };

    }

    angular.module('hercules.directives')
        .directive('hcAdminLayout', hcAdminLayout);

})();
