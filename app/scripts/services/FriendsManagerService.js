app.factory('friendsManagerService', function ($http, baseServiceUrl) {
    var service = {};

    var serviceUrl = baseServiceUrl;

    service.newPost = function (user, content, success, error) {
        $http.post(serviceUrl + '/posts',
            { 'postContent': content, 'username': user },
            { headers: this.getHeaders() })
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    }

    service.getFriendRequests = function(success, error) {
        $http.get(serviceUrl + '/me/requests', { headers: this.getHeaders() })
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    }

    service.sendFriendRequest = function(username, success, error) {
        $http.post(serviceUrl + '/me/requests/' + username, {}, { headers: this.getHeaders() })
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    }

    service.acceptFriendRequest = function (id, success, error) {
        $http.put(serviceUrl + '/me/requests/' + id + '?status=approved', {}, { headers: this.getHeaders() })
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    }

    service.rejectFriendRequest = function (id, success, error) {
        $http.put(serviceUrl + '/me/requests/' + id + '?status=delete', {}, { headers: this.getHeaders() })
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    }

    service.getOwnFriendsPreview = function(success, error) {
        $http.get(serviceUrl + '/me/friends/preview', { headers: this.getHeaders() })
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    }

    service.getOwnFriendsDetails = function (success, error) {
        $http.get(serviceUrl + '/me/friends', { headers: this.getHeaders() })
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    }

    service.getUserFriendsPreview = function (user, success, error) {
        $http.get(serviceUrl + '/users/' + user + '/friends/preview', { headers: this.getHeaders() })
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    }

    service.getUserFriendsDetails = function (user, success, error) {
        $http.get(serviceUrl + '/users/' + user + '/friends', { headers: this.getHeaders() })
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