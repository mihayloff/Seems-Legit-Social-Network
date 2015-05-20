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

    service.getHeaders = function () {
        return {
            Authorization: "Bearer " + localStorage['sessionToken']
        };
    };

    return service;
});