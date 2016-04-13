/**
 * Created by Gurpreet on 2/23/2016.
 */

"use strict";

(function(){
    angular
        .module("WanderMustApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, $scope, UserService) {

        // event handler declarations
        $scope.login = login;

        // event handler implementation
        function login(unloggedUser) {
            if (unloggedUser) {
                var username = unloggedUser.username;
                var password = unloggedUser.password;
                UserService.findUserByCredentials(username, password)
                    .then(function (response) {
                        $rootScope.currentUser = response.data;
                        $location.url('/home');
                    },
                        function (err) {
                            $scope.error = err;
                        });
            }

        }
    }
})();


