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
            template: '<h1>Hello world</h1>'
        })
        .otherwise({ redirectTo: "/admin" });

    $locationProvider.html5Mode(true);

});
