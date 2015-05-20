app.controller('PostsController', function ($scope, postsManagerService, $route) {


    $scope.getNewsFeed = function () {
        postsManagerService.getNewsFeed(function (serverData) {
            $scope.newsFeed = serverData;
        }, function (error) {
            poppy.pop('error', 'Error', 'There was an error loading the news feed');
        });
    }

    $scope.likePost = function (id) {
        postsManagerService.likePost(id, function (serverData) {
            $route.reload();
        }, function (error) {
            poppy.pop('error', 'Error', 'There was an error liking the post');
        });
    }

    $scope.unlikePost = function (id) {
        postsManagerService.unlikePost(id, function (serverData) {
            $route.reload();
        }, function (error) {
            poppy.pop('error', 'Error', 'There was an error unliking the post');
        });
    }
});