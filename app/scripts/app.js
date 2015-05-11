var app = angular.module('SocialNetwork', ['ngRoute']);

app.constant('baseServiceUrl', 'http://softuni-ads.azurewebsites.net/api');

app.config(function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'templates/login.html',
            controller: 'MainController'
        })
        .when('/register', {
            templateUrl: 'templates/register.html',
            controller: 'MainController'
        })
        .when('/', {
            templateUrl: 'templates/home.html',
            controller: 'MainController'
        })
        .when('/Login', {
            templateUrl: 'templates/login.html',
            controller: 'MainController'
        })
        .when('/Register', {
            templateUrl: 'templates/register.html',
            controller: 'MainController'
        })
        .otherwise({ redirectTo: '/' });

});