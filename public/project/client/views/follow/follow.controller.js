
/**
 * Created by Gurpreet on 4/13/2016.
 */
"use strict";
(function(){
    angular
        .module("WanderMustApp")
        .controller("FollowController", FollowController);

    function FollowController($location, $scope, UserService, $routeParams) {
        $scope.username = $routeParams.username;
        $scope.userId = $routeParams.userId;

        $scope.toLDetailsPage = toLDetailsPage;
        $scope.toRDetailsPage = toRDetailsPage;

        function toLDetailsPage(url) {
            for(var i in $scope.likedPlaces) {
                var place = $scope.likedPlaces[i];
                if(place.thumb === url) {
                    $location.url("/details/"+place.name+"/"+place.vicinity+"/"+place.place_id + "/" + place.lat + "/" + place.long);
                }
            }
        }

        function toRDetailsPage(url) {
            for(var i in $scope.reviewedPlaces) {
                var place = $scope.reviewedPlaces[i];
                if(place.thumb === url) {
                    $location.url("/details/"+place.name+"/"+place.vicinity+"/"+place.place_id + "/" + place.lat + "/" + place.long);
                }
            }
        }

        var getLikedPlaces = function() {
            UserService
                .getLikedPlaces($scope.userId)
                .then(function (response) {
                    $scope.likedPlaces = response.data.likesPlaces;
                    $scope.slides = [];
                    for(var i in $scope.likedPlaces) {
                        var slide = {
                            name: $scope.likedPlaces[i].name,
                            photo: $scope.likedPlaces[i].thumb
                        };
                        $scope.slides.push(slide);
                    }

                });
        };
        getLikedPlaces();

        var getReviewedPlaces = function() {
            UserService
                .getReviewedPlaces($scope.userId)
                .then(function(response) {
                    $scope.reviewedPlaces = response.data;
                    $scope.thumbs = [];
                    for(var i in $scope.reviewedPlaces) {
                        var thumb = {
                            name:   $scope.reviewedPlaces[i].name,
                            photo: $scope.reviewedPlaces[i].thumb
                        };
                        $scope.thumbs.push(thumb);
                    }
                });
        };

        getReviewedPlaces();

    }
})();


