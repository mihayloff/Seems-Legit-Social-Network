app.controller('FriendsController', function ($scope, friendsManagerService) {

    $scope.getFriendRequests = function() {
        friendsManagerService.getFriendRequests(function(serverData) {
            $scope.friendRequests = serverData;
        }, function(error) {
            poppy.pop('error', 'Error', 'There was an error loading the requests');
        });
    }

    $scope.acceptFriendRequest = function(id) {
        friendsManagerService.acceptFriendRequest(id, function(successData) {
            $scope.navigateToPage('Request accepted successfully', '#/FriendRequests');
        }, function(error) {
            poppy.pop('error', 'Error', 'There was an error approving the request');
        });
    }

    $scope.rejectFriendRequest = function (id) {
        friendsManagerService.rejectFriendRequest(id, function (successData) {
            $scope.navigateToPage('Request rejected successfully', '#/FriendRequests');
        }, function (error) {
            poppy.pop('error', 'Error', 'There was an error rejecting the request');
        });
    }

    $scope.getOwnFriendsPreview = function () {
        friendsManagerService.getOwnFriendsPreview(function(serverData) {
            $scope.ownFriendsPreview = serverData;
        }, function(error) {
            poppy.pop('error', 'Error', 'There was an error getting the friends preview');
        });
    }

    $scope.getFriendsDetails = function () {
        friendsManagerService.getOwnFriendsDetails(function (serverData) {
            $scope.friendsDetails = serverData;
        }, function (error) {
            poppy.pop('error', 'Error', 'There was an error getting the friends details');
        });
    }
});