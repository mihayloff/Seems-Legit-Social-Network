app.factory('authenticationService', function ($http, baseServiceUrl) {
    var service = {};

    var serviceUrl = baseServiceUrl;

    service.login = function (loginData, success, error) {
        $http.post(serviceUrl + '/users/login', loginData)
            .success(function (data, status, headers, config) {
                success(data);
            }).error(error);
    };

    service.register = function (registerData, success, error) {
        $http.post(serviceUrl + '/users/register', registerData)
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function(data) {
                error(data);
            });
    };

    service.editProfile = function(editData, success, error) {
        $http.put(serviceUrl + '/me', editData, { headers: this.getHeaders() })
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    }

    service.getDataAboutMe = function(success, error) {
        $http.get(serviceUrl + '/me', { headers: this.getHeaders() })
            .success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
    }

    service.setCredentials = function (serverData) {
        localStorage['sessionToken'] = serverData.access_token;
        localStorage['username'] = serverData.userName;
    };

    service.setProfileImage = function(profileImage) {
        localStorage['profileImage'] = profileImage;
    }

    service.getUsername = function () {
        return localStorage['username'];
    };

    service.clearCredentials = function () {
        localStorage.clear();
    };

    service.getHeaders = function () {
        return {
            Authorization: "Bearer " + localStorage['sessionToken']
        };
    };

    service.isLogged = function () {
        return localStorage['sessionToken'];
    };

    return service;
});