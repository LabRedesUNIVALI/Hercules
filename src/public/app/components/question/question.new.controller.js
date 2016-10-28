(function () {

    'use strict';

    /**
     * @class QuestionNewController
     * @classdesc New controller for question entity
     * @ngInject
     */
    function QuestionNewController (themes, QuestionAPIService,
        hcCommonDialogs, $location) {

        var vm = this;

        var _init = function () {

            vm.entity = {};
            vm.entity.options = [
                {text: ''},
                {text: ''},
                {text: ''},
                {text: ''},
                {text: ''}
            ];
            vm.processing = false;
            vm.themes = themes.data.map(function (theme) {
                return {
                    id: theme._id,
                    name: theme.name
                };
            });

            vm.querySearch = _querySearch;
            vm.save = _save;

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

        var _save = function (entity) {

            vm.processing = true;

            var themeId = entity.theme.id;
            delete entity.theme;

            QuestionAPIService.save(themeId, entity)
                .success(function (result) {
                    if (result) {
                        $location.path("admin/questions");
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

    angular.module('hercules.controller')
        .controller('QuestionNewController', QuestionNewController);

})();
