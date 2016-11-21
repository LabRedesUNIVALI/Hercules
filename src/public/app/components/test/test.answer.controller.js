(function () {

    'use strict';

    /**
     * @class TestAnswerController
     * @classdesc Controller to handle test answers
     * @ngInject
     */
    function TestAnswerController (entity) {

        var vm = this;

        var _init = function () {

            vm.entity = entity.data;
            vm.letters = ['a', 'b', 'c', 'd', 'e'];
            console.log(vm.entity)

        };

        _init();

    }

    angular.module('hercules.controllers')
        .controller('TestAnswerController', TestAnswerController);

})();
