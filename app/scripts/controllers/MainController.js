app.controller('MainController', function ($scope, authenticationService, friendsManagerService, $routeParams) {

    $scope.username = authenticationService.getUsername();
    $scope.profileImage = localStorage['profileImage'];
    $scope.name = localStorage['name'];
    $scope.isLogged = authenticationService.isLogged();

    $scope.search = function() {
        authenticationService.searchUsers($routeParams.id, function(serverData) {
            $scope.searchResults = serverData;
        }, function (error) {
            if (error.message === "Session token expired or not valid.") {
                $scope.clearCredentials();
                $scope.navigateToPage("Your session has expired. Please login again");
            }
            poppy.pop('error', 'Error', 'There was an error trying to search with the given terms');
        });
    }

    $scope.initialiseWallOwnerData = function () {

        authenticationService.getUserFullData($routeParams.id, function(serverData) {
            $scope.wallOwner = serverData;
            //$('#header').css('background-image', 'url(' + serverData.coverImageData + ')');
            $('.header').css('background-image', 'url(' + serverData.coverImageData + ')');
        }, function (error) {
            if (error.message === "Session token expired or not valid.") {
                $scope.clearCredentials();
                $scope.navigateToPage("Your session has expired. Please login again");
            }
            console.log(error);
        });
    }

    $scope.setHoverEvents = function () {
        $('.userName').unbind('mouseenter');
        $('.userName').unbind('mouseleave');
        $('.hover-box').unbind('mouseenter');
        $('.hover-box').unbind('mouseleave');

        $('.userName').mouseenter(function (event) {
            var x = event.clientX;
            var y = event.clientY;
            var username = $(this).data('id');

            $('.hover-box')
                .css('position', 'absolute')
                .css('visibility', 'visible')
                .css('top', y - 10)
                .css('left', x - 10);

            authenticationService.getUserFullData(username, function(serverData) {
                $scope.userPreviewData = serverData;
            }, function(error) {
                console.log(error);
            });
        });

        $('.hover-box').mouseenter(function() {
            $('.hover-box')
                .css('visibility', 'visible');
        });

        $('.hover-box').mouseleave(function() {
            $('.hover-box')
                .css('visibility', 'hidden');

            $scope.userPreviewData = null;
        });

        $('.userName').mouseleave(function () {
            $('.hover-box')
                .css('visibility', 'hidden');
        });
    }

    $scope.hasLoadedPreview = function() {
        return $scope.userPreviewData != null;
    }

    $scope.isFriendRequestSent = function() {
        return $scope.userPreviewData.hasPendingRequest;
    }

    $scope.isFriend = function () {
        return $scope.userPreviewData.isFriend;
    }

    $scope.isSelf = function() {
        if ($scope.userPreviewData.username === localStorage['username']) {
            return true;
        } else {
            return false;
        }
    }

    $scope.sendFriendRequest = function() {
        friendsManagerService.sendFriendRequest($scope.userPreviewData.username, function(serverData) {
            poppy.pop('success', 'Success', 'Friend request sent successfully');
        }, function (error) {
            if (error.message === "Session token expired or not valid.") {
                $scope.clearCredentials();
                $scope.navigateToPage("Your session has expired. Please login again");
            }
            poppy.pop('error', 'Error', 'An error occured when trying to send that user a friend request');
        });
    }
});