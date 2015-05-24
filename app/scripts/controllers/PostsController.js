app.controller('PostsController', function ($scope, postsManagerService, $route, $routeParams) {

    $scope.getNewsFeed = function () {
        postsManagerService.getNewsFeed(function (serverData) {
            $scope.newsFeed = serverData;
        }, function (error) {
            if (error.message === "Session token expired or not valid.") {
                $scope.clearCredentials();
                $scope.navigateToPage("Your session has expired. Please login again");
                return;
            }
            poppy.pop('error', 'Error', 'There was an error loading the news feed');
        });
    }

    $scope.getWallOwnerPosts = function() {
        postsManagerService.getWallPosts($routeParams.id, function(serverData) {
            $scope.wallPosts = serverData;
        }, function (error) {
            if (error.message === "Session token expired or not valid.") {
                $scope.clearCredentials();
                $scope.navigateToPage("Your session has expired. Please login again");
                return;
            }
            poppy.pop('error', 'Error', 'There was an error loading the wall posts');
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

    $scope.likeComment = function (postId, commentId) {
        postsManagerService.likeComment(postId, commentId, function (serverData) {
            $route.reload();
        }, function (error) {
            poppy.pop('error', 'Error', 'There was an error liking the comment');
        });
    }

    $scope.unlikeComment = function (postId, commentId) {
        postsManagerService.unlikeComment(postId, commentId, function (serverData) {
            $route.reload();
        }, function (error) {
            poppy.pop('error', 'Error', 'There was an error unliking the comment');
        });
    }

    $scope.showComments = function(id) {
        var comments = $('#comments-' + id);
        if (comments.css('display') === 'none') {
            comments.css('display', 'block');
        } else {
            comments.css('display', 'none');
        }
    }

    $scope.showUserComment = function(id) {
        var userComment = $('#userComment' + id);
        if (userComment.css('display') === 'none') {
            userComment.css('display', 'block');
        } else {
            userComment.css('display', 'none');
        }
    }

    $scope.cancelComment = function(id) {
        var userComment = $('#userComment' + id);
        var userCommentContent = $('#userCommentContent' + id);

        userCommentContent.val('');
        userComment.css('display', 'none');
    }

    $scope.submitComment = function(id) {
        var userComment = $('#userComment' + id);
        var userCommentContent = $('#userCommentContent' + id);
        var content = userCommentContent.val();

        if (!content) {
            poppy.pop('error', 'Error', 'The comment content cannot be empty.');
            return;
        }

        postsManagerService.commentPost(id, content, function (serverData) {
            $route.reload();
            poppy.pop('success', 'Success', 'Post commented successfully.');
        }, function (error) {
            if (error.message === "Session token expired or not valid.") {
                $scope.clearCredentials();
                $scope.navigateToPage("Your session has expired. Please login again");
                return;
            }
            poppy.pop('error', 'Error', 'There was an error commenting the post.');
        });

        userCommentContent.val('');
        userComment.css('display', 'none');
    }

    $scope.deletePost = function(id) {
        postsManagerService.deletePost(id, function(serverData) {
            $route.reload();
            poppy.pop('success', 'Success', 'The post has been deleted successfully');
        }, function(error) {
            poppy.pop('error', 'Error', 'An error occured when trying to delete the post');
        });
    }

    $scope.deleteComment = function (postId, commentId) {
        postsManagerService.deleteComment(postId, commentId, function (serverData) {
            $route.reload();
            poppy.pop('success', 'Success', 'The comment has been deleted successfully');
        }, function (error) {
            poppy.pop('error', 'Error', 'An error occured when trying to delete the comment');
        });
    }

    $scope.getPostDetails = function() {
        postsManagerService.getPostDetails($routeParams.id, function(serverData) {
            $scope.post = serverData;
        }, function(error) {
            poppy.pop('error', 'Error', 'An error occured when trying to load the post details');
        });
    }

    $scope.loadComments = function() {
        postsManagerService.loadComments($routeParams.id, function(serverData) {
            $scope.comments = serverData;
        }, function(error) {
            poppy.pop('error', 'Error', 'An error occured when trying to load the comments');
        });
    }

    $scope.isDeletablePost = function(post) {
        if (post.author.username === localStorage['username'] ||
                post.wallOwner.username === localStorage['username']) {
            return true;
        }
        return false;
    }

    $scope.isDeletableComment = function(commentAuthor, postAuthor) {
        return commentAuthor.username === localStorage['username'] ||
            postAuthor.username === localStorage['username'];
    }

    $scope.isPostOwnerOrAuthorFriend = function(post) {
        return post.author.isFriend || post.wallOwner.isFriend ||
            (post.author.username === localStorage['username']) ||
            (post.wallOwner.username === localStorage['username']);
    }

    $scope.exceededCommentsCount = function(length) {
        return length > 3;
    }
});