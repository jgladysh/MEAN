angular.module('LogoutCtrl', []).controller('LogoutController', function ($scope, SessionServ) {

    SessionServ.del();

});