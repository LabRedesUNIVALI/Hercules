(function () {

    'use strict';

    /**
     * @class QuestionEditController
     * @classdesc Edit controller for question entity
     * @ngInject
     */
    function QuestionEditController (entity, themes, QuestionAPIService,
        hcCommonDialogs, $location) {

        var vm = this;

        var _init = function () {

            vm.entity = entity.data;
            vm.processing = false;
            vm.themes = themes.data.map(function (theme) {
                return {
                    _id: theme._id,
                    name: theme.name
                };
            });

            vm.querySearch = _querySearch;
            vm.update = _update;

        };

        var _querySearch = function (query) {
            var results = query ? vm.themes.filter(_createFilterFor(query)) : vm.themes;
            return results;
        };

        var _createFilterFor = function (query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(theme) {
                var lowercaseName = angular.lowercase(theme.name);
                return (lowercaseName.indexOf(lowercaseQuery) > -1);
            };
        };

        var _update = function (entity) {

            vm.processing = true;

            var updatedEntity = {
                name: entity.name,
                correctOption: entity.correctOption,
                options: entity.options.map(function (option) {
                    return {
                        text: option.text
                    };
                })
            };

            QuestionAPIService.update(entity.theme._id, entity._id, updatedEntity)
                .success(function (result) {
                    if (result) {
                        $location.path('/admin/questions');
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
        .controller('QuestionEditController', QuestionEditController);

})();
