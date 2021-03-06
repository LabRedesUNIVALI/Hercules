(function () {

    'use strict';

    /**
     * @class AdminLoginController
     * @classdesc Controller to handle admin login
     * @ngInject
     */
    function AdminLoginController (AuthenticationService, $location, $mdDialog) {

        var vm = this;

        var _init = function () {

            vm.login = _login;

        };

        var _login = function (credentials) {
            AuthenticationService.adminLogin(credentials, function (success) {
                if (success) {
                    $location.path('/admin');
                } else {
                    _showIncorrectCredentialsDialog();
                }
            });
        };

        var _showIncorrectCredentialsDialog = function () {
            $mdDialog.show(
                $mdDialog.alert()
                    .parent('body')
                    .clickOutsideToClose(true)
                    .title('Atenção!')
                    .textContent('E-mail ou senha inválidos! Tente novamente.')
                    .ok('Ok')
            );
        };

        _init();

    }

    angular.module('hercules.controllers')
        .controller('AdminLoginController', AdminLoginController);

})();
