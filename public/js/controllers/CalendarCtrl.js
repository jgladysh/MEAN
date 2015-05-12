angular.module('CalendarCtrl', []).controller('CalendarController', function ($scope, EventServ) {
    var events;
    EventServ.get().success(function (data) {
        events = JSON.stringify(data);
        $('#calendar').fullCalendar({
            events: data,
            editable: true
        })
    });
});
