angular.module('hercules').config(function ($routeProvider) {

    $routeProvider
        .when('/register', {
                templateUrl: 'public/app/components/registration/registration.html',
                controller: 'RegistrationCtrl'
            }
        )
        .when('/login', {
                templateUrl: 'public/app/components/login/login.html',
                controller: 'LoginCtrl'
            }
        )
        .otherwise({ redirectTo: "/" });

});
