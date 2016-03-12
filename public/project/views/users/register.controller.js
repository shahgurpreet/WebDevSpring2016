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
                UserService.createUser(newUser, processNewUser);
            }
        }

        function processNewUser(user) {
            $rootScope.currentUser = user;
            $location.url("/profile/");
        }
    }
})();
