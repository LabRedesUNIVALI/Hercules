(function () {

    'use strict';

    /**
     * @class DisciplineNewController
     * @classdesc New controller for discipline entity
     * @ngInject
     */
    function DisciplineNewController (CRUDService, CommonDialogs,
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

            CRUDService.save({
                entity: entity,
                serviceName: 'DisciplineAPIService',
                desiredPath: '/admin/disciplines'
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
        .controller('DisciplineNewController', DisciplineNewController);

})();
