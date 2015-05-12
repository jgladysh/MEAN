angular.module('UserCtrl', []).controller('UserController', function ($scope, $location, UserServ) {

    $scope.submit = function () {
        var username = document.getElementById('username').value,
            password = document.getElementById('password').value,
            email = document.getElementById('email').value;
        UserServ.create({'username': username, 'password': password, 'email': email}).success(function () {
            $location.path('/');
        });
    }
});