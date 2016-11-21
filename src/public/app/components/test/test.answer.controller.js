(function () {

    'use strict';

    /**
     * @class TestAnswerController
     * @classdesc Controller to handle test answers
     * @ngInject
     */
    function TestAnswerController (entity, TestAPIService, hcCommonToasts, 
        $mdDialog, $cookies) {

        var vm = this;

        var _init = function () {

            vm.entity = entity.data;
            vm.letters = ['a', 'b', 'c', 'd', 'e'];
            vm.selectedTab = 0;
            vm.processing = false;

            vm.skipQuestion = _skipQuestion;
            vm.saveAnswer = _saveAnswer;
            vm.finishTest = _finishTest;

        };

        var _skipQuestion = function () {
            if (vm.selectedTab != vm.entity.questions.length - 1) {
                vm.selectedTab += 1;
            } else {
                vm.selectedTab = 0;
            }
        }

        var _saveAnswer = function (question) {
            
            vm.processing = true;

            if (!typeof question === "number") { 
                _showErrorDialog('Você precisa escolher uma alternativa!'); 
            };

            TestAPIService.saveQuestionAnswer(question._id, {
                chosenOption: question.chosenOption
            })
                .success(function (result) {
                    hcCommonToasts.notice('Questão salva!');
                    vm.processing = false;
                })
                .error(function (result) {
                    _showErrorDialog('Não foi possível salvar a questão.');
                    vm.processing = false;
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

        var _finishTest = function (ev) {
            var token = $cookies.get('studentToken');
            _showConfirmDialog(ev)
                .then(function () {
                    vm.processing = true;
                    TestAPIService.finishTest(token)
                        .success(function (result) {
                            $cookies.remove('studentToken');
                            $location.path('/student/login');
                        })
                        .error(function (result) {
                            _showErrorDialog('Não foi possível finalizar a prova.');
                        })
                }, null);
        };

        var _showConfirmDialog = function (ev) {
            var confirm = $mdDialog.confirm()
                .title('Deseja realmente finalizar a prova?')
                .htmlContent('Uma vez finalizada, você não poderá mais editá-la. <br /> A correção será baseada no que você respondeu até então.')
                .targetEvent(ev)
                .theme('default')
                .ok('Sim')
                .cancel('Não');
            return $mdDialog.show(confirm);
        };

        _init();

    }

    angular.module('hercules.controllers')
        .controller('TestAnswerController', TestAnswerController);

})();
