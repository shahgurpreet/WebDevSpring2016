/**
 * Created by Gurpreet on 2/23/2016.
 */
"use strict";
(function(){
    angular
        .module("WanderMustApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $location, $scope, UserService) {

        // event handler declarations
        $scope.update = update;

        // event handler implementation
        function update(currentUser) {
            if(currentUser) {
                var userId = $rootScope.currentUser._id;
                UserService.updateUser(userId, currentUser, processNewUser);
            }
        }

        function processNewUser(user) {
            $rootScope.currentUser = user;
        }
    }
})();

