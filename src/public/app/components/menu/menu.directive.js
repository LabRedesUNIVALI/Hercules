(function () {

    'use strict';

    /**
     * hcMenu - Directive to display left sidenav
     */
    function hcMenu () {

        return {
            scope: {},
            strict: 'E',
            templateUrl: 'menu/menu.tmpl.html',
            controller: /* @ngInject */
                function (MenuService, $location) {
                    this.actualPath = $location.url();
                    this.sections = MenuService.getSections();
                },
            controllerAs: 'vm'
        };

    }

    angular.module('hercules.directives')
        .directive('hcMenu', hcMenu);

})();
