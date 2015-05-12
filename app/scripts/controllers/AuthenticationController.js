app.controller('AuthenticationController', function ($scope, authenticationService) {

    $scope.getUserData = function() {
        authenticationService.getDataAboutMe(function(serverData) {
            $scope.userData = {
                'username': serverData.username,
                'name': serverData.name,
                'email': serverData.email,
                'profileImageData': serverData.profileImageData,
                'coverImageData': serverData.coverImageData
            };

            $('#gender' + serverData.gender).attr('checked', true);

        }, function() {
            poppy.pop('error', 'Error', 'There was an error retrieving the user data from the server');
        });
    }

    $scope.login= function() {
        var username = $scope.username;
        var password = $scope.password;

        var data = {
            'username': username,
            'password' : password
        }

        authenticationService.login(data, function (serverData) {
            authenticationService.setCredentials(serverData);

            $scope.navigateToPage('You have logged in successfully.');
        }, function (error) {
            poppy.pop('error', 'Error', error.message);
        });
    }

    $scope.register = function() {
        var username = $scope.username;
        var password = $scope.password;
        var confirmPassword = $scope.confirmPassword;
        var name = $scope.name;
        var email = $scope.email;

        var data = {
            'username': username,
            'password': password,
            'confirmPassword': confirmPassword,
            'name': name,
            'email' : email
        }

        authenticationService.register(data, function (serverData) {
            authenticationService.setCredentials(serverData);

            $scope.navigateToPage('You have registered successfully.');
        }, function(error) {
            poppy.pop('error', 'Error', error.message);
        });
    }

    $scope.editProfile = function() {
        var name = $scope.userData.name;
        var email = $scope.userData.email;
        var coverImage = $('#coverPictureData').attr('src');
        var profileImage = $('#profilePictureData').attr('src');
        var gender = $scope.userData.gender;

        var data = {};
        data['name'] = name;
        data['email'] = email;
        data['profileImageData'] = profileImage;
        data['coverImageData'] = coverImage;
        data['gender'] = gender;

        authenticationService.editProfile(data, function (serverData) {
            $scope.navigateToPage(serverData.message);
            authenticationService.setProfileImage(profileImage);
        }, function (errorMessage) {
            poppy.pop('error', 'Error', 'An error occured while trying to edit the profile');
        });
    }

    $scope.logout = function() {
        authenticationService.clearCredentials();
        $scope.navigateToPage('You have logged out successfully.');
    }

    $scope.isLogged = authenticationService.isLogged() ? true : false;
});