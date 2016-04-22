/**
 * Created by Gurpreet on 2/23/2016.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $location, $scope, UserService) {

        // event handler declarations
        $scope.register = register;

        // event handler implementation
        function register(newUser) {
            if(newUser && newUser.username && newUser.emails) {
                newUser.emails = newUser.emails.split(",");
                UserService.createUser(newUser).then(
                    function (response) {
                        var user = response.data;
                        if(user != null) {
                            $rootScope.currentUser = newUser;
                            $location.url("/profile/");
                        } else {
                            $scope.err = 'Username already exists!'
                        }
                    },
                    function(err) {
                        $scope.err = err;
                    }
                )
            }
        }
    }
})();