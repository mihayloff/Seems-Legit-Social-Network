app.controller('MainController', function ($scope, authenticationService) {

    $scope.username = authenticationService.getUsername();
    $scope.profileImage = localStorage['profileImage'];
    $scope.isLogged = authenticationService.isLogged();
});