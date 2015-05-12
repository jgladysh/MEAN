angular.module('SessionCtrl', []).controller('SessionController', function ($scope, $location, SessionServ) {

    $scope.submit = function () {
        var username = document.getElementById('username').value,
            password = document.getElementById('password').value;
        SessionServ.create({'username': username, 'password': password}).success(function () {
            $location.path('/');
        });
    };


});