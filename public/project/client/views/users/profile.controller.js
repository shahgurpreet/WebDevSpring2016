/**
 * Created by Gurpreet on 2/23/2016.
 */
"use strict";
(function(){
    angular
        .module("WanderMustApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $location, $scope, UserService) {

        var getLikedPlaces = function() {
            UserService
                .getLikedPlaces()
                .then(function (response) {
                    $scope.likedPlaces = response.data;
                });
        };
        getLikedPlaces();

        var getReviewedPlaces = function() {
          UserService
              .getReviewedPlaces()
              .then(function(response) {
                 $scope.reviewedPlaces = response.data;
              });
        };

        getReviewedPlaces();

        // event handler declarations
        $scope.update = update;

        // event handler implementation
        function update(currentUser) {
            if(currentUser) {
                var userId = $rootScope.currentUser._id;
                UserService.updateUser(userId, currentUser).then(
                    function (response) {
                        $rootScope.currentUser = currentUser;
                    }
                )
            }
        }
    }
})();


