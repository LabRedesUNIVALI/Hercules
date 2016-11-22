(function () {

    'use strict';

    /**
     * hcToolbar - Directive to display the top toolbar
     */
    function hcToolbar() {

        return {
            strict: 'E',
            scope: {},
            templateUrl: 'public/components/toolbar/toolbar.tmpl.html',
            controller: /* @ngInject */
                function (AuthenticationService, $location) {
                this.openMenu = function ($mdOpenMenu, ev) {
                    $mdOpenMenu(ev);
                };
                this.logout = function () {
                    AuthenticationService.logout(function (success) {
                        if (success) {
                            $location.path('/login');
                        } else {
                            $location.path('/login');
                        }
                    });
                };
            },
            controllerAs: 'vm'
        };

    }

    angular.module('hercules.directives')
        .directive('hcToolbar', hcToolbar);

})();
