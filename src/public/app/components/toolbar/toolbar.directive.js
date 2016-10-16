angular.module('hercules').directive('hcToolbar', function () {

    return {
        strict: 'E',
        scope: {},
        templateUrl: 'public/components/toolbar/toolbar.tmpl.html',
        controller: ['AuthenticationService', '$location', function (AuthenticationService, $location) {
            var originatorEv;
            this.openMenu = function ($mdOpenMenu, ev) {
                originatorEv = ev;
                $mdOpenMenu(ev);
            };
            this.logout = function () {
                AuthenticationService.logout();
                $location.path('/login');
            };
        }],
        controllerAs: 'ctrl'
    };

});
