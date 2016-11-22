(function () {

    'use strict';

    /**
     * CommonToasts - Service to display common toasts
     * @ngInject
     */
    function CommonToasts ($mdToast) {

        var self = this;
        
        self.Notice = function (message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('right bottom')
                    .hideDelay('2000')
            );
        };

        self.notice = {
            success: {
                New: function () {
                    self.Notice('Registro adicionado com sucesso!');
                },
                Update: function () {
                    self.Notice('Registro atualizado com sucesso!');
                },
                Delete: function () {
                    self.Notice('Registro excluído com sucesso!');
                }
            },
            error: {
                Delete: function () {
                    self.Notice('Não foi possível excluir o registro.');
                }
            }
        };

    }

    angular.module('hercules.services')
        .service('CommonToasts', CommonToasts);

})();
