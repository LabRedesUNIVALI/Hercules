angular.module('hercules').directive('hcMenu', function () {

    return {
        scope: {},
        strict: 'E',
        templateUrl: 'public/components/menu/menu.tmpl.html',
        controller: function (MenuService, $location) {
            this.actualPath = $location.path();
            this.sections = MenuService.getSections();
        },
        controllerAs: 'ctrl'
    };

});