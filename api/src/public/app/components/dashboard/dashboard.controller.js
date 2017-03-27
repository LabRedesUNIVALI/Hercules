(function () {
    
    'use strict';

    /**
     * @class DashboardController
     * @classdesc Controller for dashboard view
     * @ngInject
     */
    function DashboardController ($scope, CommonToasts) {

        var vm = this;

        var _init = function () {

            _setupListeners();

        };

        var _setupListeners = function () {
            $scope.$on('RESET_PASSWORD', function () {
                CommonToasts.notice.success.ResetPassword();
            });
        };

        _init();

    }

    angular.module('hercules.controllers')
        .controller('DashboardController', DashboardController);

})();
