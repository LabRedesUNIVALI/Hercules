(function () {

    'use strict';

    /**
     * @class TestAnswerController
     * @classdesc Controller to handle test answers
     * @ngInject
     */
    function TestAnswerController (entity, TestAPIService, hcCommonToasts,$mdDialog) {

        var vm = this;

        var _init = function () {

            vm.entity = entity.data;
            vm.letters = ['a', 'b', 'c', 'd', 'e'];
            vm.selectedTab = 0;
            console.log(vm.entity);

            vm.skipQuestion = _skipQuestion;
            vm.saveAnswer = _saveAnswer;

        };

        var _skipQuestion = function () {
            if (vm.selectedTab != vm.entity.questions.length - 1) {
                vm.selectedTab += 1;
            } else {
                vm.selectedTab = 0;
            }
        }

        var _saveAnswer = function (question) {
            if (!typeof question === "number") { 
                _showErrorDialog('Você precisa escolher uma alternativa!'); 
            };
            console.log(question);throw 'a';
            TestAPIService.saveQuestionAnswer(question._id, {
                chosenOption: question.chosenOption
            })
                .success(function (result) {
                    hcCommonToasts.notice('Questão salva!');
                })
                .error(function (result) {
                    _showErrorDialog('Não foi possível salvar a questão.');
                });
        };

        var _showErrorDialog = function (message) {
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.body))
                    .clickOutsideToClose(true)
                    .title('Atenção!')
                    .textContent(message)
                    .ok('Ok')
            )
        };

        _init();

    }

    angular.module('hercules.controllers')
        .controller('TestAnswerController', TestAnswerController);

})();
