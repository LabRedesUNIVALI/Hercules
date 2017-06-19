(function () {

    'use strict';

    /**
     * router - Configure application routes
     * @ngInject
     */
    function router ($routeProvider, $locationProvider) {

        $routeProvider

            // Register
            .when('/admin/register', {
                templateUrl: 'registration/registration.view.html',
                controller: 'RegistrationController',
                controllerAs: 'vm'
            })

            // Login
            .when('/admin/login', {
                templateUrl: 'login/admin.login.view.html',
                controller: 'AdminLoginController',
                controllerAs: 'vm'
            })

            // Change password
            .when('/admin/reset-password', {
                templateUrl: 'user/reset-password.view.html',
                controller: 'PasswordController',
                controllerAs: 'vm',
            })

            // Dashboard
            .when('/admin/dashboard', {
                templateUrl: 'dashboard/dashboard.view.html',
                controller: 'DashboardController',
                controllerAs: 'vm'
            })

            // Disciplines
            .when('/admin/disciplines', {
                templateUrl: 'discipline/discipline.index.view.html',
                controller: 'DisciplineIndexController',
                controllerAs: 'vm',
                resolve: { /* @ngInject */
                    entities: function (DisciplineAPIService) {
                        return DisciplineAPIService.getAll();
                    }
                }
            })

            .when('/admin/disciplines/new', {
                templateUrl: 'discipline/discipline.new.view.html',
                controller: 'DisciplineNewController',
                controllerAs: 'vm'
            })

            .when('/admin/disciplines/:id/edit', {
                templateUrl: 'discipline/discipline.edit.view.html',
                controller: 'DisciplineEditController',
                controllerAs: 'vm',
                resolve: { /* @ngInject */
                    entity: function (DisciplineAPIService, $route) {
                        return DisciplineAPIService.getById($route.current.params.id);
                    }
                }
            })

            // Themes
            .when('/admin/themes', {
                templateUrl: 'theme/theme.index.view.html',
                controller: 'ThemeIndexController',
                controllerAs: 'vm',
                resolve: { /* @ngInject */
                    entities: function (ThemeAPIService) {
                        return ThemeAPIService.getAll();
                    }
                }
            })

            .when('/admin/themes/new', {
                templateUrl: 'theme/theme.new.view.html',
                controller: 'ThemeNewController',
                controllerAs: 'vm'
            })

            .when('/admin/themes/:id/edit', {
                templateUrl: 'theme/theme.edit.view.html',
                controller: 'ThemeEditController',
                controllerAs: 'vm',
                resolve: { /* @ngInject */
                    entity: function (ThemeAPIService, $route) {
                        return ThemeAPIService.getById($route.current.params.id);
                    }
                }
            })

            // Questions
            .when('/admin/questions', {
                templateUrl: 'question/question.index.view.html',
                controller: 'QuestionIndexController',
                controllerAs: 'vm',
                resolve: { /* @ngInject */
                    entities: function (QuestionAPIService) {
                        return QuestionAPIService.getAll();
                    }
                }
            })

            .when('/admin/questions/new', {
                templateUrl: 'question/question.new.view.html',
                controller: 'QuestionNewController',
                controllerAs: 'vm',
                resolve: { /* @ngInject */
                    themes: function (ThemeAPIService) {
                        return ThemeAPIService.getAll();
                    }
                }
            })

            .when('/admin/questions/:id/edit', {
                templateUrl: 'question/question.edit.view.html',
                controller: 'QuestionEditController',
                controllerAs: 'vm',
                resolve: { /* @ngInject */
                    entity: function (QuestionAPIService, $route) {
                        return QuestionAPIService.getById($route.current.params.id);
                    },
                    themes: function (ThemeAPIService) {
                        return ThemeAPIService.getAll();
                    }
                }
            })

            // Test
            .when('/admin/tests/new', {
                templateUrl: 'test/test.new.view.html',
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
                templateUrl: 'test/test.index.view.html',
                controller: 'TestIndexController',
                controllerAs: 'vm',
                resolve: { /* @ngInject */
                    entities: function (TestAPIService) {
                        return TestAPIService.getAll();
                    }
                }
            })

            .when('/admin/tests/:id/edit', {
                templateUrl: 'test/test.edit.view.html',
                controller: 'TestEditController',
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

            // Student
            .when('/student/login', {
                templateUrl: 'login/student.login.view.html',
                controller: 'StudentLoginController',
                controllerAs: 'vm'
            })

            .when('/student/test', {
                templateUrl: 'test/test.answer.view.html',
                controller: 'TestAnswerController',
                controllerAs: 'vm',
                resolve: { /* @ngInject */
                    entity: function (TestAPIService, $cookies) {
                        var token = $cookies.get('studentToken');
                        if (token) {
                            return TestAPIService.getByToken(token);
                        }
                    }
                } 
            })

            // Whatever
            .otherwise({ redirectTo: '/admin/dashboard' });

        $locationProvider.html5Mode(true);

    }

    angular.module('hercules')
        .config(router);

})();
