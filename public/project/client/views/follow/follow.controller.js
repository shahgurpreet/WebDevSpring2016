
/**
 * Created by Gurpreet on 4/13/2016.
 */
"use strict";
(function(){
    angular
        .module("WanderMustApp")
        .controller("FollowController", FollowController);

    function FollowController($location, $scope, UserService, PhotoService, $routeParams, $rootScope) {
        $scope.username = $routeParams.username;
        $scope.userId = $routeParams.userId;

        $scope.toLDetailsPage = toLDetailsPage;
        $scope.toRDetailsPage = toRDetailsPage;
        $scope.likePhoto = likePhoto;

        $scope.activeUserLikedPhotos = [];

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


        var getCurrentUserLikedPhotos = function() {
            UserService.getLikedPhotos()
                .then(function(response) {
                    var likedPhotos = response.data;
                    for(var i in likedPhotos) {
                        var photo = likedPhotos[i];
                        $scope.activeUserLikedPhotos.push(photo.photo);
                    }
                });
        };

        getCurrentUserLikedPhotos();

        var getLikedPhotos = function () {
            UserService
                .getLikedPhotos($scope.userId)
                .then(function(response) {
                    var likedPhotos = response.data;
                    $scope.likedPhotos = likedPhotos;
                });
        };

        getLikedPhotos();

        function likePhoto(photo) {
            if($rootScope.currentUser) {
                $scope.activeUserLikedPhotos.push(photo.photo);
                var photo_1 = {};
                photo_1.photo = photo.photo;
                photo_1.tags = photo.tags;
                photo_1.userLikes = [];
                photo_1.userLikes.push($rootScope.currentUser._id);
                PhotoService.userLikesPhoto($rootScope.currentUser._id, photo_1);
            }
        }

    }
})();


