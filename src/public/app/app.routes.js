(function () {

    'use strict';

    /**
     * router - Configure application routes
     * @ngInject
     */
    function router ($routeProvider, $locationProvider) {

        $routeProvider

            // Register
            .when('/register', {
                templateUrl: 'public/components/registration/registration.view.html',
                controller: 'RegistrationController'
            })

            // Login
            .when('/login', {
                templateUrl: 'public/components/login/login.view.html',
                controller: 'LoginController'
            })

            // Profile
            .when('/admin/profile', {
                templateUrl: 'public/components/user/profile.view.html',
                controller: 'ProfileController',
                resolve: {
                    entity: ['UserAPIService', function (UserAPIService) {
                        return UserAPIService.getProfile();
                    }]
                }
            })

            // Dashboard
            .when('/admin/dashboard', {
                templateUrl: 'public/components/dashboard/dashboard.view.html'
            })

            // Disciplines
            .when('/admin/disciplines', {
                templateUrl: 'public/components/discipline/discipline.index.view.html',
                controller: 'DisciplineIndexController',
                resolve: {
                    entities: ['DisciplineAPIService', function (DisciplineAPIService) {
                        return DisciplineAPIService.getAll();
                    }]
                }
            })

            .when('/admin/disciplines/new', {
                templateUrl: 'public/components/discipline/discipline.new.view.html',
                controller: 'DisciplineNewController'
            })

            .when('/admin/disciplines/:id/edit', {
                templateUrl: 'public/components/discipline/discipline.edit.view.html',
                controller: 'DisciplineEditController',
                resolve: {
                    entity: ['DisciplineAPIService', '$route', function (DisciplineAPIService, $route) {
                        return DisciplineAPIService.getById($route.current.params.id);
                    }]
                }
            })

            // Themes
            .when('/admin/themes', {
                templateUrl: 'public/components/theme/theme.index.view.html',
                controller: 'ThemeIndexController',
                resolve: {
                    entities: ['ThemeAPIService', function (ThemeAPIService) {
                        return ThemeAPIService.getAll();
                    }]
                }
            })

            .when('/admin/themes/new', {
                templateUrl: 'public/components/theme/theme.new.view.html',
                controller: 'ThemeNewController'
            })

            .when('/admin/themes/:id/edit', {
                templateUrl: 'public/components/theme/theme.edit.view.html',
                controller: 'ThemeEditController',
                resolve: {
                    entity: ['ThemeAPIService', '$route', function (ThemeAPIService, $route) {
                        return ThemeAPIService.getById($route.current.params.id);
                    }]
                }
            })

            // Questions
            .when('/admin/questions', {
                templateUrl: 'public/components/question/question.index.view.html',
                controller: 'QuestionIndexController',
                resolve: {
                    entities: ['QuestionAPIService', function (QuestionAPIService) {
                        return QuestionAPIService.getAll();
                    }]
                }
            })

            .when('/admin/questions/new', {
                templateUrl: 'public/components/question/question.new.view.html',
                controller: 'QuestionNewController',
                resolve: {
                    themes: ['ThemeAPIService', function (ThemeAPIService) {
                        return ThemeAPIService.getAll();
                    }]
                }
            })

            .when('/admin/questions/:id/edit', {
                templateUrl: 'public/components/question/question.edit.view.html',
                controller: 'QuestionEditController',
                resolve: {
                    entity: ['QuestionAPIService', '$route', function (QuestionAPIService, $route) {
                        return QuestionAPIService.getById($route.current.params.id);
                    }],
                    themes: ['ThemeAPIService', function (ThemeAPIService) {
                        return ThemeAPIService.getAll();
                    }]
                }
            })

            // Test
            .when('/admin/tests/new', {
                templateUrl: 'public/components/test/test.new.view.html',
                controller: 'TestNewController',
                controllerAs: 'vm',
                resolve: { /* @ngInject */
                    disciplines: function (DisciplineAPIService) {
                        return DisciplineAPIService.getAll();
                    },
                    themes: function (ThemeAPIService) {
                        return ThemeAPIService.getAll();
                    }
                }
            })

            .when('/admin/tests', {
                templateUrl: 'public/components/test/test.index.view.html',
                controller: 'TestIndexController',
                controllerAs: 'vm',
                resolve: { /* @ngInject */
                    entities: function (TestAPIService) {
                        return TestAPIService.getAll();
                    }
                }
            })

            .when('/admin/tests/:id/edit', {
                templateUrl: 'public/components/test/test.edit.view.html',
                controller: 'TestEditController',
                controllerAs: 'vm',
                resolve: { /* ngInject */
                    entity: function (TestAPIService, $route) {
                        return TestAPIService.getById($route.current.params.id);
                    },
                    disciplines: function (DisciplineAPIService) {
                        return DisciplineAPIService.getAll();
                    },
                    themes: function (ThemeAPIService) {
                        return ThemeAPIService.getAll();
                    }
                }
            })

            .when('/admin/tests/:id', {
                templateUrl: 'public/components/test/test.detail.view.html',
                controller: 'TestDetailController',
                controllerAs: 'vm',
                resolve: { /* @ngInject */
                    entity: function (TestAPIService, $route) {
                        return TestAPIService.getById($route.current.params.id);
                    },
                    disciplines: function (DisciplineAPIService) {
                        return DisciplineAPIService.getAll();
                    },
                    themes: function (ThemeAPIService) {
                        return ThemeAPIService.getAll();
                    }
                }
            })

            // Whatever
            .otherwise({ redirectTo: "/admin/dashboard" });

        $locationProvider.html5Mode(true);

    }

    angular.module('hercules')
        .config(router);

})();
