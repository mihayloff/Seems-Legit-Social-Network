app.controller('MainController', function ($scope) {

    $scope.isLogged = localStorage['logged-in'] ? true : false;
});