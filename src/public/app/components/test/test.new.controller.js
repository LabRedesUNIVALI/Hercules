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

        var init = function () {

            vm.disciplines = disciplines.data;
            vm.themes = themes.data;
            vm.entity = {};
            vm.entity.questions = [];
            vm.questions = [];
            vm.processing = false;

            vm.getQuestions = getQuestions;
            vm.toggleQuestion = toggleQuestion;
            vm.save = save;
            vm.showQuestionInfo = showQuestionInfo;

        };

        var lastSearch = [];

        var getQuestions = function (themes) {

            var equal = (themes.length === lastSearch.length) && lastSearch.every(function (item, index) {
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

                lastSearch = themes;
            }

        };

        var toggleQuestion = function (item, list) {
            var index = list.indexOf(item);
            if (index > -1) {
                list.splice(index, 1);
            }
            else {
                list.push(item);
            }
        };

        var save = function (entity) {

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

        var showQuestionInfo = function (question, ev) {
            hcCommonDialogs.questionInfo(question, ev);
        };

        init();

    };

    angular.module('hercules.controllers')
        .controller('TestNewController', TestNewController);

})();
