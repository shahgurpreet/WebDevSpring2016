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
            if(newUser) {
                UserService.createUser(newUser).then(
                    function (response) {
                        var user = response.data;
                        if(user != null) {
                            $rootScope.currentUser = user;
                            $location.url("/home/");
                        }
                    },
                    function(err) {
                        $scope.error = err;
                    }
                )
            }
        }
    }
})();
