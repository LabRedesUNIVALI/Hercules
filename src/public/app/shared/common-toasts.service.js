angular.module('hercules').service('hcCommonToasts', [
    '$mdToast',
    function ($mdToast) {

        this.notice = function (message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('right bottom')
                    .hideDelay('2000')
            );
        };
}]);
