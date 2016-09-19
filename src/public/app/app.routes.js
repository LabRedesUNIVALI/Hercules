angular.module('hercules').config(function ($routeProvider, $locationProvider) {

    $routeProvider

        //Register
        .when('/register', {
            templateUrl: 'public/components/registration/registration.view.html',
            controller: 'RegistrationController'
        })

        //Login
        .when('/login', {
            templateUrl: 'public/components/login/login.view.html',
            controller: 'LoginController'
        })

        //Dashboard
        .when('/admin/dashboard', {
            templateUrl: 'public/components/dashboard/dashboard.view.html'
        })

        //Disciplines
        .when('/admin/disciplines', {
            templateUrl: 'public/components/discipline/discipline.index.view.html',
            controller: 'DisciplineIndexController'
        })
        .when('/admin/disciplines/new', {
            templateUrl: 'public/components/discipline/discipline.new.view.html',
            controller: 'DisciplineNewController'
        })
        .when('/admin/disciplines/:id/edit', {
            templateUrl: 'public/components/discipline/discipline.edit.view.html',
            controller: 'DisciplineEditController'
        })

        //Questions
        .when('/admin/questions', {
            templateUrl: 'public/components/question/question.index.view.html',
            controller: 'QuestionIndexController'
        })
        .when('/admin/questions/new', {
            templateUrl: 'public/components/question/question.new.view.html',
            controller: 'QuestionNewController'
        })
        .when('/admin/questions/:id/edit', {
            templateUrl: 'public/components/question/question.edit.view.html',
            controller: 'QuestionEditController'
        })

        //Whatever
        .otherwise({ redirectTo: "/admin/dashboard" });

    $locationProvider.html5Mode(true);

});
