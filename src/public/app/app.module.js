angular.module('hercules', [
    'ngMaterial',
    'ngRoute',
    'ngMessages',
    'ngCookies',
    'ngAria',
    'md.data.table'
])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('accessTokenInterceptor');
    }])
    .config(['$mdThemingProvider', function ($mdThemingProvider) {
        $mdThemingProvider.theme('success')
            .primaryPalette('green', {'default': '800'});
    }])
    .config(['$mdDateLocaleProvider', function ($mdDateLocaleProvider) {
        $mdDateLocaleProvider.formatDate = function (date) {
            return moment(date).format('DD/MM/YYYY HH:mm');
        }
    }])
    .run(['$rootScope', '$location', '$cookies', function ($rootScope, $location, $cookies) {
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/login', '/register'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$cookies.get('accessToken')) {
                $location.path('/login');
            }
        });
    }])
    .run(['$templateCache', function ($templateCache) {
        $templateCache.put(
            'test-print-body.html',
            '<p> <strong>Disciplina:</strong> {{test.discipline.name}} {{test.discipline.year}}/{{test.discipline.semester}}</p><p> <strong>Data e horário de início:</strong> {{test.beginDate | date:"dd/MM/yyyy HH:mm"}}</p><p> <strong>Data e horário de término:</strong> {{test.endDate | date:"dd/MM/yyyy HH:mm"}}</p><br /><h3 style="margin-left: 400px;">{{test.name}}</h3><br />'
        );
        $templateCache.put(
            'test-print-question.html',
            '<p> <strong>{{index}}.</strong> {{question.name}}</p>'
        );
        $templateCache.put(
            'test-print-option.html',
            '<p> <strong>{{letter}})</strong> {{option.text}}</p>'
        );
    }]);
