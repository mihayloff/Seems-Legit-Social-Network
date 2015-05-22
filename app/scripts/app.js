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

    $rootScope.clearCredentials = function () {
        localStorage.clear();
    }
});

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/home.html',
            controller: 'MainController'
        })
        .when('/FriendRequests', {
        templateUrl: 'templates/friendRequests.html',
        controller: 'MainController',
        resolve: {
            factory: redirectToHomeIfNotLogged
        }
        })
        .when('/Search/:id', {
            templateUrl: 'templates/searchResults.html',
            controller: 'MainController',
            resolve: {
                factory: redirectToHomeIfNotLogged
            }
        })
        .when('/EditProfile', {
            templateUrl: 'templates/editProfile.html',
            controller: 'MainController',
            resolve: {
                factory: redirectToHomeIfNotLogged
            }
        })
        .when('/ChangePassword', {
            templateUrl: 'templates/changePassword.html',
            controller: 'MainController',
            resolve: {
                factory: redirectToHomeIfNotLogged
            }
        })
        .when('/Login', {
            templateUrl: 'templates/login.html',
            controller: 'MainController',
            resolve: {
                factory: redirectToHomeIfLogged
            }
        })
        .when('/Register', {
            templateUrl: 'templates/register.html',
            controller: 'MainController',
            resolve: {
                factory: redirectToHomeIfLogged
            }
        })
        .when('/Search/:id', {
            templateUrl: 'templates/search.html',
            controller: 'MainController',
            resolve: {
                factory: redirectToHomeIfNotLogged
            }
        })
        .when('/User/:id', {
            templateUrl: 'templates/wall.html',
            controller: 'MainController',
            resolve: {
                factory: redirectToHomeIfNotLogged
            }
        })
        .when('/OwnFriends', {
            templateUrl: 'templates/friendsDetailedList.html',
            controller: 'MainController',
            resolve: {
                factory: redirectToHomeIfNotLogged
            }
        })
        .when('/:id/Friends', {
            templateUrl: 'templates/friendsDetailedList.html',
            controller: 'MainController',
            resolve: {
                factory: redirectToHomeIfNotLogged
            }
        })
        .when('/Post/:id', {
            templateUrl: 'templates/detailedPost.html',
            controller: 'MainController',
            resolve: {
                factory: redirectToHomeIfNotLogged
            }
        })
        .otherwise({ redirectTo: '/' });

});

function redirectToHomeIfNotLogged() {
    if (!localStorage['sessionToken']) {
        var splitted = window.location.href.split('#');
        window.location.replace(splitted[0] + '#/');

        poppy.pop('error', 'Error', 'You must be logged in to access this page');
    }
}

function redirectToHomeIfLogged() {
    if (localStorage['sessionToken']) {
        var splitted = window.location.href.split('#');
        window.location.replace(splitted[0] + '#/');

        poppy.pop('error', 'Error', 'You have already logged in');
    }
}