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
        .when('/logout', {
            controller: 'LogoutController'
        })
        .when('/admin', {
            templateUrl: 'public/components/dashboard/dashboard.view.html'
        })
        .when('/admin/disciplines', {
            templateUrl: 'public/components/discipline/discipline.view.html'
        })
        .when('/admin/themes', {
            templateUrl: 'public/components/theme/theme.view.html'
        })
        .when('/admin/questions', {
            templateUrl: 'public/components/question/question.view.html'
        })
        .otherwise({ redirectTo: "/admin" });

    $locationProvider.html5Mode(true);

});
