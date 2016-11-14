(function () {

    'use strict';

    /**
     * @class TestNewController
     * @classdesc New controller for test entity
     * @ngInject
     */
    function TestNewController(disciplines, themes, TestAPIService,
        QuestionAPIService, hcCommonDialogs, $location) {

        var vm = this;

        var _init = function () {

            vm.disciplines = disciplines.data;
            vm.themes = themes.data;
            vm.entity = {};
            vm.entity.questions = [];
            vm.questions = [];
            vm.processing = false;

            vm.getQuestions = _getQuestions;
            vm.toggleQuestion = _toggleQuestion;
            vm.save = _save;
            vm.showQuestionInfo = _showQuestionInfo;

        };

        var _lastSearch = [];

        var _getQuestions = function (themes) {

            var equal = (themes.length === _lastSearch.length) && _lastSearch.every(function (item, index) {
                return item === themes[index];
            });

            if (!equal) {

                vm.questions = [];

                themes.forEach(function (item) {
                    QuestionAPIService.getAllByTheme(item)
                        .success(function (result) {
                            vm.questions = vm.questions.concat(result);
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

        var _save = function (entity) {

            vm.processing = true;

            TestAPIService.save(entity)
                .success(function (result) {
                    if (result) {
                        $location.path('admin/tests');
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
        .controller('TestNewController', TestNewController);

})();
