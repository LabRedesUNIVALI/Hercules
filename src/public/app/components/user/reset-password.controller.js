(function () {

    'use strict';

    /**
     * @class PasswordController
     * @classdesc Controller for changing user password
     * @ngInject
     */
    function PasswordController (UserAPIService, $mdDialog, $rootScope, 
        $location, $timeout) {

        var vm = this;

        var _init = function () {

            vm.processing = false;

            vm.changePassword = _changePassword;

        };

        var _changePassword = function (credentials) {

            vm.processing = true;

            UserAPIService.changePassword(credentials)
                .success (function (result) {
                    $location.path('/admin/dashboard');
                    $timeout(function () {
                        $rootScope.$broadcast('RESET_PASSWORD');
                    }, 1000);
                })
                .error(function () {
                    _showIncorrectPasswordDialog();
                    vm.processing = false;
                });
        };

        var _showIncorrectPasswordDialog = function () {
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.body))
                    .clickOutsideToClose(true)
                    .title('Atenção!')
                    .textContent('Senha atual inválida. Verifique e tente novamente.')
                    .ok('Ok')
            );
        };

        _init();

    }

    angular.module('hercules.controllers')
        .controller('PasswordController', PasswordController);

})();
