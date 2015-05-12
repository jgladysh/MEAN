angular.module('EventService', []).factory('EventServ', ['$http', function ($http) {

    return {
        // call to get all events
        get: function () {
            return $http.get('/api/events')
        },

        // call to get event by id
        getById: function (id) {
            return $http.get('/api/events/' + id);
        },

        // call to create a new event
        create: function () {
            return $http.post('/api/events/', eventData);
        },

        // call to update event by id
        update: function (id, eventData) {
            return $http.put('/api/events/' + id, eventData);
        },

        // call to delete the event by id
        del: function (id) {
            return $http.delete('/api/events/' + id);
        }
    }

}]);
