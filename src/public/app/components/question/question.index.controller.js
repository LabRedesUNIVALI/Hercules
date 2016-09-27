angular.module('hercules').controller('QuestionIndexController', [
    '$scope',
    'entities',
    'QuestionAPIService',
    'ThemeAPIService',
    'hcCommonToasts',
    'hcCommonDialogs',
    '$mdDialog',
    '$location',
    function ($scope, entities, QuestionAPIService, ThemeAPIService, hcCommonToasts, hcCommonDialogs, $mdDialog, $location) {

        $scope.entities = entities.data;
        $scope.selected = [];

        $scope.delete = function (entity, ev) {
            hcCommonDialogs.confirmDelete(ev).then(function () {
                QuestionAPIService.delete(entity.theme._id, entity._id)
                    .success(function (result) {
                        var index = $scope.entities.indexOf(entity);
                        $scope.entities.splice(index, 1);
                        hcCommonToasts.notice('Registro excluído com sucesso.');
                    })
                    .error(function () {
                        hcCommonToasts.notice('Não foi possível excluir o registro.')
                    });
            }, null);
        };

        $scope.addQuestion = function (ev) {
            ThemeAPIService.getAll()
                .success(function (result) {
                    if (result.length > 0) {
                        $location.path('/admin/questions/new');
                    } else {
                        showNoThemesDialog(ev);
                    }
                });
        };

        var showNoThemesDialog = function (ev) {
            $mdDialog.show(
                $mdDialog.alert()
                    .title('Não há conteúdos cadastrados!')
                    .textContent('Você deve cadastrar conteúdos para poder adicionar questões.')
                    .clickOutsideToClose(true)
                    .targetEvent(ev)
                    .ok('Entendi')
            );
        };
}]);
