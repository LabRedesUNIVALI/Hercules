(function () {

    'use strict';

    /**
     * @class DisciplineNewController
     * @classdesc New controller for discipline entity
     * @ngInject
     */
    function DisciplineNewController (DisciplineAPIService, hcCommonDialogs,
        $location) {

        var vm = this;

        var _init = function () {

            vm.entity = {};
            vm.entity.students = [
                { name: '' }
            ];
            vm.processing = false;

            vm.save = _save;
            vm.addStudentField = _addStudentField;
            vm.removeStudentField = _removeStudentField;

        };

        var _addStudentField = function () {
            vm.entity.students.push({ name: '' });
        };

        var _removeStudentField = function (index) {
            vm.entity.students.splice(index, 1);
        };

        var _save = function (entity) {

            vm.processing = true;

            DisciplineAPIService.save(entity)
                .success(function (result) {
                    if (result) {
                        $location.path('/admin/disciplines');
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
        .controller('DisciplineNewController', DisciplineNewController);

})();
