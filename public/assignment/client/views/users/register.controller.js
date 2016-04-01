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
            if(newUser) {
                newUser.emails = newUser.emails.split(",");
                UserService.createUser(newUser).then(
                    function (response) {
                        var currentUser = response.data;
                        if(currentUser){
                            $rootScope.currentUser = currentUser;
                            $location.url("/profile/");
                        }
                    }
                )
            }
        }
    }
})();
