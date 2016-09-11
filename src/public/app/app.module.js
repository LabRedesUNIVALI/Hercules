angular.module('hercules', [
    'ngMaterial',
    'ngRoute',
    'ngMessages',
    'ngCookies'
])
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('accessTokenInterceptor');
    });
