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

        }, function () {
            if (error.message === "Session token expired or not valid.") {
                $scope.clearCredentials();
                $scope.navigateToPage("Your session has expired. Please login again");
                return;
            }
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
            authenticationService.getDataAboutMe(function(successData) {
                authenticationService.setProfileImage(successData.profileImageData);
                authenticationService.setName(successData.name);

                $scope.navigateToPage('You have logged in successfully.');
            }, function() {
                poppy.pop('error',
                    'Error',
                    'An error occured while trying to connect to the server. Please try again later');
            })

        }, function (error) {

            poppy.pop('error', 'Error', 'The username or password are incorrect. Please try again.');
        });
    }

    $scope.register = function() {
        var username = $scope.username;
        var password = $scope.password;
        var confirmPassword = $scope.confirmPassword;
        var name = $scope.name;
        var email = $scope.email;

        if (username && username.length < 6) {
            poppy.pop('error', 'Error', 'The username must be atleast 6 characters long');
            return;
        } else if (password !== confirmPassword) {
            poppy.pop('error', 'Error', 'The passwords don\'t match');
            return;
        } else if (password.length < 6) {
            poppy.pop('error', 'Error', 'The password must be atleast 6 characters long');
            return;
        } else if (name && name.length < 6) {
            poppy.pop('error', 'Error', 'The name must be atleast 6 characters long');
            return;
        } else if (email.indexOf('@') < 0 || email.length < 3) {
            poppy.pop('error', 'Error', 'The email is invalid');
            return;
        }

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
        var gender = $("input:radio[name=gender-radio]:checked").val();

        if (gender !== 'Other' && 
            gender !== 'Male' &&
            gender !== 'Female') {
            poppy.pop('error', 'Error', 'The gender is invalid');
            return;
        } else if (name.length < 6) {
            poppy.pop('error', 'Error', 'The name must be atleast 6 characters long');
            return;
        } else if (email.indexOf('@') < 0 || email.length < 4) {
            poppy.pop('error', 'Error', 'The email is invalid');
            return;
        }

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
            if (error.message === "Session token expired or not valid.") {
                $scope.clearCredentials();
                $scope.navigateToPage("Your session has expired. Please login again");
                return;
            }
            poppy.pop('error', 'Error', 'An error occured while trying to edit the profile');
        });
    }

    $scope.changePassword = function () {
        var oldPassword = $scope.oldPassword;
        var newPassword = $scope.newPassword;
        var confirmPassword = $scope.confirmPassword;

        if (newPassword !== confirmPassword) {
            poppy.pop('error', 'Error', 'The passwords don\'t match');
            return;
        } else if (newPassword.length < 6) {
            poppy.pop('error', 'Error', 'The password length must be atleast 6 characters long');
            return;
        }

        var data = {
            'oldPassword': oldPassword,
            'newPassword': newPassword,
            'confirmPassword' : confirmPassword
        }

        authenticationService.changePassword(data, function(successData) {
            $scope.navigateToPage('You have changed your password successfully');
        }, function(error) {
            poppy.pop('error', 'Error', 'The old password is incorrect');
        });
    }

    $scope.logout = function() {
        authenticationService.clearCredentials();
        $scope.navigateToPage('You have logged out successfully.');
    }

    $scope.isLogged = authenticationService.isLogged() ? true : false;
});