angular.module('hercules').config(function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/register', {
                templateUrl: 'public/components/registration/registration.tmpl.html',
                controller: 'RegistrationCtrl'
            }
        )
        .when('/login', {
                templateUrl: 'public/components/login/login.tmpl.html',
                controller: 'LoginCtrl'
            }
        )
        .otherwise({ redirectTo: "/" });

    $locationProvider.html5Mode(true);

});
