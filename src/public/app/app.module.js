(function () {

    'use strict';

    /**
     * interceptors - Configure application interceptors
     * @ngInject
     */
    function interceptors ($httpProvider) {
        $httpProvider.interceptors.push('AccessTokenInterceptor');
    }

    /**
     * themes - Configure application themes
     * @ngInject
     */
    function themes ($mdThemingProvider) {
        $mdThemingProvider.theme('success')
            .primaryPalette('green', {'default': '800'});
    }

    /**
     * authorization - Redirect users if not logged in.
     * @ngInject
     */
    function authorization ($rootScope, $location, $cookies) {
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/admin/login', '/admin/register', '/student/login', '/student/test'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$cookies.get('accessToken')) {
                $location.path('/student/login');
            }
        });
    }

    /**
     * templates - Put specific templates in cache
     * @ngInject
     */
    function templates ($templateCache) {
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
    }

    /**
     * masks - Config input masks
     * @ngInject
     */
    function masks (uiMaskConfigProvider) {
        uiMaskConfigProvider.addDefaultPlaceholder(false);
        uiMaskConfigProvider.maskDefinitions({ '*': /[a-zA-Z0-9]/ });
    }

    angular.module('hercules.controllers', []);
    angular.module('hercules.services', []);
    angular.module('hercules.directives', []);
    angular.module('hercules.filters', []);

    var dependencies = [
        'ngMaterial',                   // Angular Material
        'ngRoute',                      // Angular Route
        'ngMessages',                   // Angular Messages
        'ngCookies',                    // Angular Cookies
        'ngAria',                       // Angular Aria
        'md.data.table',                // Material Design data tables
        'pascalprecht.translate',       // Angular Translate
        'ngSanitize',                   // Angular Sanitize
        'ui.mask',                      // Angular UI Mask
        'hercules.controllers',         // Hercules controllers
        'hercules.services',            // Hercules services
        'hercules.directives',          // Hercules directives
        'hercules.filters'              // Hercules filters
    ];

    angular.module('hercules', dependencies)
        .config(interceptors)
        .config(themes)
        .config(['uiMask.ConfigProvider', masks])
        .run(authorization)
        .run(templates);

})();
