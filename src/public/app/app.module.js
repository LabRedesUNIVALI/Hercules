angular.module('hercules', [
    'ngMaterial',
    'ngRoute',
    'ngMessages',
    'ngCookies',
    'ngAria',
    'md.data.table'
])
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('accessTokenInterceptor');
    })
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('success')
            .primaryPalette('green', {'default': '800'});
    })
    .config(function ($mdDateLocaleProvider) {
        $mdDateLocaleProvider.formatDate = function (date) {
            return moment(date).format('DD/MM/YYYY HH:mm');
        }
    })
    .run(function ($rootScope, $location, $cookies) {
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/login', '/register'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$cookies.get('accessToken')) {
                $location.path('/login');
            }
        });
    });
