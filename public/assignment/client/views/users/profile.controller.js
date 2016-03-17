/**
 * Created by Gurpreet on 2/23/2016.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $location, $scope, UserService) {

        // event handler declarations
        $scope.update = update;

        // event handler implementation
        function update(currentUser) {
            if(currentUser) {
                var userId = $rootScope.currentUser._id;
                UserService.updateUser(userId, currentUser).then(
                    function (response) {
                        console.log(response);
                        $rootScope.currentUser = response.data.user;
                    }
                )
            }
        }
    }
})();


