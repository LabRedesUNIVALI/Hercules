(function () {

    'use strict';

    /**
     * @class RegistrationController
     * @classdesc Controller to handle user registration
     * @ngInject
     */
    function RegistrationController (UserAPIService, AuthenticationService,
        CommonDialogs, $location) {

        var vm = this;

        var _init = function () {

            vm.processing = false;

            vm.register = _register;

        };

        var _register = function(user) {

            vm.processing = true;

            UserAPIService.createUser(user)
                .then(function(response){
                    if (response) {
                        AuthenticationService.adminLogin({ email: user.email, password: user.password }, function (success) {
                            $location.path('/admin');
                        });
                    } else {
                        CommonDialogs.genericError();
                        vm.processing = false;
                    }
                }, function () {
                    CommonDialogs.genericError();
                    vm.processing = false;
                });
        };

        _init();

    }

    angular.module('hercules.controllers')
        .controller('RegistrationController', RegistrationController);

})();
