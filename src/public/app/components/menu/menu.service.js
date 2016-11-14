(function () {

    'use strict';

    /**
     * MenuService - Service to handle menu components
     */
    function MenuService () {

        var _sections = [
            {
                name: 'Painel',
                path: '/admin/dashboard',
                icon: 'dashboard',
                urlName: 'dashboard'
            },
            {
                name: 'Disciplinas',
                path: '/admin/disciplines',
                icon: 'people',
                urlName: 'disciplines'
            },
            {
                name: 'Conteúdos',
                path: '/admin/themes',
                icon: 'class',
                urlName: 'themes'
            },
            {
                name: 'Questões',
                path: '/admin/questions',
                icon: 'question_answer',
                urlName: 'questions'
            },
            {
                name: 'Provas',
                path: '/admin/tests',
                icon: 'description',
                urlName: 'tests'
            }
        ];

        this.getSections = function () {
            return _sections;
        };

    }

    angular.module('hercules.services')
        .service('MenuService', MenuService);

})();
