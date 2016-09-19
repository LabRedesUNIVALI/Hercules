angular.module('hercules').config(function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/register', {
            templateUrl: 'public/components/registration/registration.view.html',
            controller: 'RegistrationController'
        })
        .when('/login', {
            templateUrl: 'public/components/login/login.view.html',
            controller: 'LoginController'
        })
        .when('/admin', {
            templateUrl: 'public/components/dashboard/dashboard.view.html'
        })
        .when('/admin/disciplines', {
            templateUrl: 'public/components/discipline/discipline.index.view.html',
            controller: 'DisciplineIndexController'
        })
        .when('/admin/themes', {
            templateUrl: 'public/components/theme/theme.index.view.html',
            controller: 'ThemeIndexController'
        })
        .when('/admin/themes/:id/questions', {
            templateUrl: 'public/components/question/question.index.view.html',
            controller: 'QuestionIndexController'
        })
        .otherwise({ redirectTo: "/admin" });

    $locationProvider.html5Mode(true);

});
