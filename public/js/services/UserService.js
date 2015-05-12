angular.module('UserService', []).factory('UserServ', ['$http', function ($http) {

    return {
        // call to get user by id
        getById: function (id) {
            return $http.get('/users/' + id);
        },

        // call to create new user (registration)
        create: function (userData) {
            return $http.post('/users', userData);
        }
    }

}]);
