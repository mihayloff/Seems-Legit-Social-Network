app.factory('postsManagerService', function ($http, baseServiceUrl) {
    var service = {};

    var serviceUrl = baseServiceUrl;

    service.getNewsFeed = function (success, error) {
        $http.get(serviceUrl + '/me/feed?StartPostId=&PageSize=5', { headers: this.getHeaders() })
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    }

    service.getWallPosts = function (user, success, error) {
        $http.get(serviceUrl + '/users/' + user + '/wall?StartPostId=&PageSize=5', { headers: this.getHeaders() })
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    }

    service.likePost = function(id, success, error) {
        $http.post(serviceUrl + '/Posts/' + id + '/likes', {}, { headers: this.getHeaders() })
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    }

    service.unlikePost = function (id, success, error) {
        $http.delete(serviceUrl + '/Posts/' + id + '/likes', { headers: this.getHeaders() })
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    }

    service.likeComment = function (postId, commentId, success, error) {
        $http.post(serviceUrl + '/posts/' + postId + '/comments/' + commentId + '/likes', {}, { headers: this.getHeaders() })
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    }

    service.unlikeComment = function (postId, commentId, success, error) {
        $http.delete(serviceUrl + '/posts/' + postId + '/comments/' + commentId + '/likes', { headers: this.getHeaders() })
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    }

    service.commentPost = function(postId, content, success, error) {
        $http.post(serviceUrl + '/posts/' + postId + '/comments',
            { 'commentContent': content },
            { headers: this.getHeaders() })
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    }

    service.getHeaders = function () {
        return {
            Authorization: "Bearer " + localStorage['sessionToken']
        };
    };

    return service;
});