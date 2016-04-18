/**
 * Created by Gurpreet on 2/23/2016.
 */
"use strict";
(function(){
    angular
        .module("WanderMustApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $location, $scope, UserService) {

        // event handler declarations
        $scope.register = register;

        // event handler implementation
        function register(newUser) {
            $scope.err = undefined;
            if(newUser.password !== newUser.confirmPassword) {
                $scope.err = 'Please make sure that your passwords match.'
            }

            if(newUser && newUser.username && newUser.email) {
                if(newUser && !$scope.err) {
                    UserService.createUser(newUser).then(
                        function (response) {
                            var user = response.data;
                            if(user != null) {
                                $rootScope.currentUser = newUser;
                                $location.url("/home/");
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
    }
})();
