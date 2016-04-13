
/**
 * Created by Gurpreet on 4/13/2016.
 */
"use strict";
(function(){
    angular
        .module("WanderMustApp")
        .controller("FavoritesController", FavoritesController);

    function FavoritesController($location, $scope, UserService) {

        var getLikedPlaces = function() {
            UserService
                .getLikedPlaces()
                .then(function (response) {
                    $scope.likedPlaces = response.data.likesPlaces;
                    $scope.slides = [];
                    for(var i in $scope.likedPlaces) {
                        $scope.slides.push($scope.likedPlaces[i].thumb);
                    }

                });
        };
        getLikedPlaces();

        var getReviewedPlaces = function() {
            UserService
                .getReviewedPlaces()
                .then(function(response) {
                    $scope.reviewedPlaces = response.data;
                    $scope.thumbs = [];
                    for(var i in $scope.reviewedPlaces) {
                        $scope.thumbs.push($scope.reviewedPlaces[i].thumb);
                    }
                });
        };

        getReviewedPlaces();
    }
})();


