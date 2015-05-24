app.controller('FriendsController', function ($scope, friendsManagerService, authenticationService, $route, $routeParams) {

    $scope.setCurrentUser = function() {
        $scope.currentUser = $routeParams.id;
    }

    $scope.setCurrentName = function() {
        authenticationService.getUserFullData($routeParams.id, function(serverData) {
            $scope.currentName = serverData.name;
        }, function(error) {
            if (error.message === "Session token expired or not valid.") {
                $scope.clearCredentials();
                $scope.navigateToPage("Your session has expired. Please login again");
                return;
            }
        });
    }

    $scope.getFriendRequests = function() {
        friendsManagerService.getFriendRequests(function(serverData) {
            $scope.friendRequests = serverData;
        }, function (error) {
            if (error.message === "Session token expired or not valid.") {
                $scope.clearCredentials();
                $scope.navigateToPage("Your session has expired. Please login again");
                return;
            }
            poppy.pop('error', 'Error', 'There was an error loading the requests');
        });
    }

    $scope.submitPost = function () {
        var user = $routeParams.id;
        var content = $('#postTextArea').val();
        if (!content) {
            poppy.pop('error', 'Error', 'The post content cannot be empty');
            return;
        }

        friendsManagerService.newPost(user, content, function (serverData) {
            $route.reload();
            poppy.pop('success', 'Success', 'New post created successfully');
        }, function (error) {
            if (error.message === "Session token expired or not valid.") {
                $scope.clearCredentials();
                $scope.navigateToPage("Your session has expired. Please login again");
                return;
            }
            poppy.pop('error', 'Error', 'An error occured when trying to submit the post');
        });
    }

    $scope.acceptFriendRequest = function(id) {
        friendsManagerService.acceptFriendRequest(id, function(successData) {
            $scope.navigateToPage('Request accepted successfully', '#/FriendRequests');
        }, function (error) {
            if (error.message === "Session token expired or not valid.") {
                $scope.clearCredentials();
                $scope.navigateToPage("Your session has expired. Please login again");
                return;
            }
            poppy.pop('error', 'Error', 'There was an error approving the request');
        });
    }

    $scope.rejectFriendRequest = function (id) {
        friendsManagerService.rejectFriendRequest(id, function (successData) {
            $scope.navigateToPage('Request rejected successfully', '#/FriendRequests');
        }, function (error) {
            if (error.message === "Session token expired or not valid.") {
                $scope.clearCredentials();
                $scope.navigateToPage("Your session has expired. Please login again");
                return;
            }
            poppy.pop('error', 'Error', 'There was an error rejecting the request');
        });
    }

    $scope.getOwnFriendsPreview = function () {
        friendsManagerService.getOwnFriendsPreview(function(serverData) {
            $scope.ownFriendsPreview = serverData;
        }, function (error) {
            if (error.message === "Session token expired or not valid.") {
                $scope.clearCredentials();
                $scope.navigateToPage("Your session has expired. Please login again");
                return;
            }
            poppy.pop('error', 'Error', 'There was an error getting the friends preview');
        });
    }

    $scope.getWallOwnerFriendsPreview = function () {
        if ($routeParams.id === localStorage['username']) {
            $scope.getOwnFriendsPreview();
            return;
        }

        friendsManagerService.getUserFriendsPreview($routeParams.id, function(serverData) {
            $scope.ownFriendsPreview = serverData;
        }, function (error) {
            $('.friendsPreview').attr('style', 'display: none !important');
            $('.newPost').attr('style', 'display: none !important');

            if (error.message === "Session token expired or not valid.") {
                $scope.clearCredentials();
                $scope.navigateToPage("Your session has expired. Please login again");
                return;
            }
        });
    }

    $scope.getWallOwnerFriendsDetails = function () {
        if ($routeParams.id === localStorage['username']) {
            $scope.getFriendsDetails();
            return;
        }
        friendsManagerService.getUserFriendsDetails($routeParams.id, function (serverData) {
            $scope.friendsDetails = serverData;
        }, function (error) {
            if (error.message === "Session token expired or not valid.") {
                $scope.clearCredentials();
                $scope.navigateToPage("Your session has expired. Please login again");
                return;
            }
            poppy.pop('error', 'Error', 'There was an error getting the friends details');
        });
    }

    $scope.getFriendsDetails = function () {
        friendsManagerService.getOwnFriendsDetails(function (serverData) {
            $scope.friendsDetails = serverData;
        }, function (error) {
            if (error.message === "Session token expired or not valid.") {
                $scope.clearCredentials();
                $scope.navigateToPage("Your session has expired. Please login again");
                return;
            }
            poppy.pop('error', 'Error', 'There was an error getting the friends details');
        });
    }
});