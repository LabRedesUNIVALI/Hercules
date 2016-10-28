(function () {

    'use strict';

    /**
     * hcCommonToasts - Service to display common toasts
     * @ngInject
     */
    function hcCommonToasts ($mdToast) {

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
        .service('hcCommonToasts', hcCommonToasts);

})();
