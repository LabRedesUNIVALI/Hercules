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
                .success(function (data, status, headers, conf) {
                    $log.debug(status);
                    if (data) {
                        $location.path(config.desiredPath);
                        $timeout(function () {
                            $rootScope.$broadcast('NEW');
                        }, 1000);
                    } else {
                        callback(false);
                    }
                })
                .error(function (err) {
                    $log.error(err);
                    callback(false);
                });

        }

        this.update = function (config) {

            var EntityAPIService = $injector.get(config.serviceName);

            EntityAPIService.update(config.id, config.entity)
                .success(function (data, status, headers, conf) {
                    $log.debug(status);
                    if (data) {
                        $location.path(config.desiredPath);
                        $timeout(function () {
                            $rootScope.$broadcast('UPDATE');
                        }, 1000);
                    } else {
                        callback(false);
                    }
                })
                .error(function (err) {
                    $log.error(err);
                    callback(false);
                });

        };

    }

    angular.module('hercules.services')
        .service('CRUDService', CRUDService);

})();
