(function () {
    
    'use strict';

    /**
     * @class TokenListController
     * @classdesc Controller to handle tokens informations
     * @ngInject
     */
    function TokenListController (entities) {

        var vm = this;

        var _init = function () {

            vm.entities = entities.data;

        };

        _init();

    }

    angular.module('hercules.controllers')
        .controller('TokenListController', TokenListController);

})();
