(function () {

    'use strict';

    /**
     * @class TestEditController
     * @classdesc Edit controller for test entity
     * @ngInject
     */
    function TestEditController(entity, disciplines, themes, TestAPIService,
        QuestionAPIService, hcCommonDialogs, $filter, $location) {

        var vm = this;

        var _init = function () {

            vm.entity = entity.data;
            vm.entity.beginDate = $filter('date')(entity.data.beginDate);
            vm.entity.endDate = $filter('date')(entity.data.endDate);
            vm.disciplines = disciplines.data;
            vm.themes = themes.data;
            vm.processing = false;
            vm.entity.themes = entity.data.themes.map(function (theme) {
                return theme._id;
            });
            vm.entity.questions = entity.data.questions.map(function (question) {
                return question._id;
            });
            vm.questions = [];

            vm.getQuestions = _getQuestions;
            vm.toggleQuestion = _toggleQuestion;
            vm.update = _update;
            vm.showQuestionInfo = _showQuestionInfo;

            _getQuestions(entity.data.themes);

        };

        var _lastSearch = [];

        var _getQuestions = function (themes) {

            var equal = (themes.length === _lastSearch.length) && _lastSearch.every(function (item, index) {
                return item === themes[index];
            });

            if (!equal) {

                themes.forEach(function (item) {
                    QuestionAPIService.getAllByTheme(item)
                        .success(function (result) {
                            vm.questions = result;
                        })
                        .error(function () {
                            hcCommonDialogs.genericError();
                        });
                });

                _lastSearch = themes;
            }

        };

        var _toggleQuestion = function (item, list) {
            var index = list.indexOf(item);
            if (index > -1) {
                list.splice(index, 1);
            }
            else {
                list.push(item);
            }
        };

        var _update = function (entity) {

            vm.processing = true;

            var updatedEntity = {
                name: entity.name,
                beginDate: entity.beginDate,
                endDate: entity.endDate,
                themes: entity.themes,
                discipline: entity.discipline._id,
                questions: entity.questions
            };

            TestAPIService.update(entity._id, updatedEntity)
                .success(function (result) {
                    if (result) {
                        $location.path('/admin/tests');
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

        var _showQuestionInfo = function (question, ev) {
            hcCommonDialogs.questionInfo(question, ev);
        };

        _init();

    }

    angular.module('hercules.controllers')
        .controller('TestEditController', TestEditController);

})();
