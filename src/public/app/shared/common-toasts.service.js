(function () {

    'use strict';

    /**
     * CommonToasts - Service to display common toasts
     * @ngInject
     */
    function CommonToasts ($mdToast) {

        this.notice = function (message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('right bottom')
                    .hideDelay('2000')
            );
        };

    }

    angular.module('hercules.services')
        .service('hcCommonToasts', CommonToasts);

})();
