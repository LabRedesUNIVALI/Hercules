(function () {

    'use strict';

    /**
     * @class StudentLoginController
     * @classdesc Controller to handle student login
     * @ngInject
     */
    function StudentLoginController (AuthenticationService, $location, 
        $mdDialog) {
        
        var vm = this;

        var _init = function () {
            
            vm.login = _login;

        };

        var _login = function (credentials) {
            AuthenticationService.studentLogin(credentials, function (success) {
                if (success) {
                    $location.path('/student/test');
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
                    .textContent('Token inválido ou expirado! Tente novamente.')
                    .ok('Ok')
            );
        };

        _init();

    }

    angular.module('hercules.controllers')
        .controller('StudentLoginController', StudentLoginController);

})();
