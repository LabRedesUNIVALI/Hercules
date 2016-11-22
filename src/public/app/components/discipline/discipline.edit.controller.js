(function () {

    'use strict';

    /**
     * @class DisciplineEditController
     * @classdesc Edit controller for discipline entity
     * @ngInject
     */
    function DisciplineEditController (entity, CRUDService,
        CommonDialogs, $location) {

        var vm = this;

        var _init = function () {

            vm.entity = entity.data;
            vm.processing = false;
            vm.entity.year = parseInt(vm.entity.year, 10);

            vm.addStudentField = _addStudentField;
            vm.removeStudentField = _removeStudentField;
            vm.update = _update;

        };

        var _addStudentField = function () {
            vm.entity.students.push({ name: '' });
        };

        var _removeStudentField = function (index) {
            vm.entity.students.splice(index, 1);
        };

        var _update = function (entity) {

            vm.processing = true;

            var updatedEntity = {
                name: entity.name,
                year: entity.year,
                semester: entity.semester,
                students: entity.students.map(function (student) {
                    return {
                        name: student.name
                    };
                })
            };

            CRUDService.update({
                id: entity._id,
                entity: updatedEntity,
                serviceName: 'DisciplineAPIService',
                desiredPath: 'admin/disciplines'
            }, function (success) {
                if (!success) {
                    CommonDialogs.genericError();
                    vm.processing = false;
                }
            });

        };

        _init();

    }

    angular.module('hercules.controllers')
        .controller('DisciplineEditController', DisciplineEditController);

})();
