var app = angular.module('SocialNetwork', ['ngRoute']);

app.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api');

app.run(function ($rootScope) {
    $rootScope.navigateToPage = function (message, page) {
        var initialLocation = window.location.href;

        var splitted = window.location.href.split('#');
        if (page) {
            window.location.replace(splitted[0] + '' + page);
        } else {
            window.location.replace(splitted[0] + '#/');
        }

        if (initialLocation === window.location.href) {
            location.reload();
        }

        if (message) {
            poppy.pop('success', 'Success', message);
        }
    }
});

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/home.html',
            controller: 'MainController'
        })
        .when('/EditProfile', {
            templateUrl: 'templates/editProfile.html',
            controller: 'MainController'
        })
        .when('/ChangePassword', {
            templateUrl: 'templates/changePassword.html',
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