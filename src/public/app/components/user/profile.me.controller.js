angular.module('hercules').controller('ProfileMeController', function ($scope, UserAPIService) {

    UserAPIService.profileMe()
        .success(function (data) {
            $scope.entity = data;
        });

});
