angular.module('hercules').config(function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/register', {
                templateUrl: 'public/components/registration/registration.view.html',
                controller: 'RegistrationController'
            }
        )
        .when('/login', {
                templateUrl: 'public/components/login/login.view.html',
                controller: 'LoginController'
            }
        )
        .otherwise({ redirectTo: "/" });

    $locationProvider.html5Mode(true);

});
