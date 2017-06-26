(function () {
    
    'use strict';

    /**
     * CRUDService - Service to handle basic crud operations, including screen elements
     * @ngInject
     */
    function CRUDService ($location, $rootScope, $log, $timeout, $injector) {

        this.save = function (config, callback) {
            
            var EntityAPIService = $injector.get(config.serviceName);

            EntityAPIService.save(config.entity)
                .then(function (response) {
                    if (response.data) {
                        $location.path(config.desiredPath);
                        $timeout(function () {
                            $rootScope.$broadcast('NEW');
                        }, 1000);
                    } else {
                        callback(false);
                    }
                }, function (err) {
                    callback(false);
                });

        }

        this.update = function (config) {

            var EntityAPIService = $injector.get(config.serviceName);

            EntityAPIService.update(config.id, config.entity)
                .then(function (response) {
                    if (response.data) {
                        $location.path(config.desiredPath);
                        $timeout(function () {
                            $rootScope.$broadcast('UPDATE');
                        }, 1000);
                    } else {
                        callback(false);
                    }
                }, function (err) {
                    callback(false);
                });

        };

    }

    angular.module('hercules.services')
        .service('CRUDService', CRUDService);

})();
