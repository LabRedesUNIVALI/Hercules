angular.module('hercules').directive('hcMenu', function () {

    return {
        scope: {},
        strict: 'E',
        templateUrl: 'public/components/menu/menu.tmpl.html',
        controller: ['MenuService', '$location', function (MenuService, $location) {
            this.actualPath = $location.url();
            this.sections = MenuService.getSections();
        }],
        controllerAs: 'ctrl'
    };

});
