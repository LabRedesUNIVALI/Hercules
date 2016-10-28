(function () {

    'use strict';

    /**
     * @class RegistrationController
     * @classdesc Controller to handle user registration
     * @ngInject
     */
    function RegistrationController (UserAPIService, AuthenticationService,
        hcCommonDialogs, $location) {

        var vm = this;

        var _init = function () {

            vm.processing = false;

            vm.register = _register;

        };

        var _register = function(user) {

            vm.processing = true;

            UserAPIService.createUser(user)
                .success(function(response){
                    if (response) {
                        AuthenticationService.login({ email: user.email, password: user.password }, function (success) {
                            $location.path('/admin');
                        });
                    } else {
                        hcCommonDialogs.genericError();
                        vm.processing = false;
                    }
                })
                .error(function () {
                    hcCommonDialogs.genericError();
                    vm.processing = false;
                });
        };

        _init();

    }

    angular.module('hercules.controllers')
        .controller('RegistrationController', RegistrationController);

})();
