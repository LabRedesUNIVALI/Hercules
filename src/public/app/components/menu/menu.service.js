angular.module('hercules').factory('MenuService', function () {

    var _sections = [
        {
            name: 'Painel',
            path: '/admin',
            icon: 'dashboard'
        },
        {
            name: 'Disciplinas',
            path: '/admin/disciplines',
            icon: 'people'
        },
        {
            name: 'Conteúdos',
            path: '/admin/themes',
            icon: 'class'
        },
        {
            name: 'Questões',
            path: '/admin/questions',
            icon: 'question_answer'
        }
    ];
    
    var _getSections = function () {
        return _sections;
    };

    return {
        getSections: _getSections
    };

});
