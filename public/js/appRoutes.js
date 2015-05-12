angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // login page, use passportjs for login
        .when('/login', {
            templateUrl: 'views/login.html'
        })

        // route that provide logout, use passportjs
        .when('/logout', {
            templateUrl: 'views/home.html',
            controller: 'LogoutController'
        })

        // register page, use passportjs for registration
        .when('/register', {
            templateUrl: 'views/register.html'
        })

        // page with calendar
        .when('/calendar', {
            templateUrl: 'views/calendar.html',
            controller: 'CalendarController'
        });

    $locationProvider.html5Mode(true);

}]);