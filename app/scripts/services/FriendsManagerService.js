app.factory('friendsManagerService', function ($http, baseServiceUrl) {
    var service = {};

    var serviceUrl = baseServiceUrl;

    service.getFriendRequests = function(success, error) {
        $http.get(serviceUrl + '/me/requests', { headers: this.getHeaders() })
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    }

    service.sendFriendRequest = function(username, success, error) {
        $http.post(serviceUrl + '/me/requests/' + username, { headers: this.getHeaders() })
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

    service.getHeaders = function () {
        return {
            Authorization: "Bearer " + localStorage['sessionToken']
        };
    };

    return service;
});