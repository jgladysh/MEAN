angular.module('MainCtrl', []).controller('MainController', function ($scope, SessionServ) {

    SessionServ.get().success(function (data) {
        $scope.tagline = 'Hello! ' + JSON.stringify(data);
    });

});
