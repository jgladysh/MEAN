angular.module('SessionService', []).factory('SessionServ', ['$http', function ($http) {

    return {
        // call to get session
        get: function () {
            return $http.get('/session');
        },

        // call to login
        create: function (sessionData) {
            return $http.post('/session', sessionData);
        },

        // call to logout
        del: function () {
            return $http.delete('/session');
        }

    }

}]);
