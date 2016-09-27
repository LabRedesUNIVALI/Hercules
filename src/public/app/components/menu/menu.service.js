angular.module('hercules').service('MenuService', function () {

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
        }
    ];
    
    this.getSections = function () {
        return _sections;
    };

});
