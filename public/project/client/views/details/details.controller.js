(function () {
    angular
        .module("WanderMustApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, $rootScope, $location, POIService, InstagramService, TwitterService, PlaceService,
                               UserService, $routeParams, $timeout, $sce, PhotoService) {

        $scope.getInstagramPhotos = getInstagramPhotos;
        $scope.favorite = favorite;
        $scope.addComment = addComment;
        $scope.likePhoto = likePhoto;
        $scope.followUser = followUser;
        $scope.deleteComment = deleteComment;

        $scope.name = $routeParams.name;
        $scope.instagramImagesAndTags = [];
        $scope.twitterPosts = [];
        $scope.noMoreTwitterData = false;
        $scope.noMoreInstaData = false;
        $scope.likedPhotos = [];
        $scope.moreInsta = false;
        $scope.moreTwit = false;
        $scope.loading = true;
        $scope.loadingT = true;
        $scope.commentIndex = -1;

        var currentUser = $rootScope.currentUser;
        var name = $routeParams.name;
        var place_id = $routeParams.place_id;
        var lat = $routeParams.lat;
        var long = $routeParams.long;

        $scope.paging = function(){
            $scope.moreInsta = false;
            if($scope.name != undefined) {
                InstagramService.instaNext($scope.name, getMorePhotos);
                function getMorePhotos(response) {
                    $timeout(function(){
                        if(response.length === 0) {
                            $scope.loading = false;
                        } else {
                            var instaPosts = response;
                            for(var i = 0; i < instaPosts.length; i++) {
                                var post = instaPosts[i];
                                $scope.instagramImagesAndTags.push({
                                    tags: post.title,
                                    photo: post.url
                                });

                                if(response.length > 0) {
                                    setTimeout(function () {
                                        $scope.$apply(function(){
                                            $scope.moreInsta = true;
                                        });
                                    }, 2000);
                                }
                            }
                        }
                    });

                }
            }
        };

        $scope.pagingTwitter = function() {
            $scope.moreTwit = false;
            if($scope.name != undefined) {
                TwitterService.twitterNext($scope.name, getMoreTweets);
                function getMoreTweets(response) {
                    if(response.length === 0) {
                        $scope.loadingT = false;
                    } else {
                        $timeout(function(){
                            for(var i in response) {
                                $scope.twitterPosts.push(response[i]);
                            }
                        });
                        setTimeout(function () {
                            $scope.$apply(function(){
                                $scope.moreTwit = true;
                            });
                        }, 1000);
                    }

                }
            }
        };

        var getLikes = function() {
            PlaceService
                .findUserLikes (place_id)
                .then(function(response){
                    var userLikesIds = response.data.likes;
                    UserService.getUsernamesByIds(userLikesIds).then(
                        function(doc) {
                            $scope.likes = response.data.likes;
                            if($rootScope.currentUser) {
                                var users = doc.data;
                                var usernames = [];
                                for(var i in users) {
                                    var user = users[i];
                                    if(user.username != $rootScope.currentUser.username)  {
                                        usernames.push(user);
                                    }
                                }
                                $scope.usernames = usernames;
                            }
                        },
                        function(err) {
                            console.log(err);
                        }
                    );
                });
        };
        getLikes();

        var getPlaceDetails = function() {
            POIService.getPlaceDetails(place_id, processPlaceDetails);
        };

        getPlaceDetails();

        var getReviews = function(){
            PlaceService
                .findPlaceById(place_id)
                .then(function(response){
                    if(response.data)
                        $scope.reviews = response.data.reviews;
                });
        };

        getReviews();

        var getPlaceSummary = function() {
            POIService.getPlaceSummary(name, processPlaceSummary);
        };

        function processPlaceSummary(response) {
            $scope.placeSummary = $sce.trustAsHtml(response);
        }

        getPlaceSummary();

        function processPlaceDetails(placeDetails) {
            var places = [];
            places.push(placeDetails);
            POIService.findPhotos(places, renderPlaceDetails);
        }

        function renderPlaceDetails(placeDetailsArray) {
            $scope.placeDetails = {};
            $scope.placeDetails = placeDetailsArray[0];
            if($scope.reviews) {
                $scope.placeDetails.reviews = $scope.reviews;
            }
            if($scope.likes) {
                $scope.placeDetails.likes = $scope.likes;
            }
        }

        if(currentUser) {
            UserService.getLikedPhotos()
                .then(function(response) {
                    var likedPhotos = response.data;
                    for(var i in likedPhotos) {
                        var photo = likedPhotos[i];
                        $scope.likedPhotos.push(photo.photo);
                    }
                });
        }

        function  getInstagramPhotos() {
            $scope.name = $routeParams.name;
            $scope.name = $scope.name.replace(/ +/g, "");
            //name = accentsTidy(name);

            InstagramService.getInstaPhotos($scope.name, true, renderInsta);

            function renderInsta(response) {

                if(response.length === 0) {
                    $scope.loading = false;
                }
                $timeout(function(){
                    var instaPosts = response;
                    for(var i = 0; i < instaPosts.length; i++) {
                        var post = instaPosts[i];
                        $scope.instagramImagesAndTags.push({
                            tags: post.title,
                            photo: post.url
                        });

                        if(response.length > 0) {
                            setTimeout(function () {
                                $scope.$apply(function(){
                                    $scope.moreInsta = true;
                                });
                            }, 2000);
                        }
                    }
                });

            }
        }

        getInstagramPhotos();

        function getTwitterPosts() {
            TwitterService.getTwitterPosts($routeParams.name, true, render);

            function render(response) {
                if(response.length === 0) {
                    $scope.loadingT = false;
                    $scope.moreTwit = false;
                } else {
                    $scope.twitterPosts = response;
                    setTimeout(function () {
                        $scope.$apply(function(){
                            $scope.moreTwit = true;
                        });
                    }, 2000);
                }

            }
        }

        getTwitterPosts();


        if(currentUser && currentUser.roles && currentUser.roles.indexOf('Admin') > -1) {
            $scope.dc = true;
        }

        function favorite(place1) {
            if(currentUser) {
                var place = {};
                place.likes = [];
                $scope.placeDetails.likes = [];
                $scope.placeDetails.likes.push(currentUser._id);
                place.likes.push(currentUser._id);
                place.name = $routeParams.name;
                place.place_id = $routeParams.place_id;
                place.thumb = place1.photo;
                place.vicinity = place1.address;
                place.lat = lat;
                place.long = long;
                place.reviews = place1.reviews;
                PlaceService
                    .userLikesPlace(currentUser._id, place);
            } else {
                $location.url("/login");
            }
        }

        function addComment(comment) {
            var box = angular.element.find("textarea");
            box[0].value = '';
            if(currentUser) {
                if(comment) {
                    $scope.placeDetails.reviews.push(comment);
                    var place = {};
                    place.name = $routeParams.name;
                    place.place_id = $routeParams.place_id;
                    place.thumb = $scope.placeDetails.photo;
                    place.vicinity = $scope.placeDetails.address;
                    place.lat = lat;
                    place.long = long;
                    place.reviews = $scope.placeDetails.reviews;
                    $scope.comm = '';
                    PlaceService.userCommentsOnPlace(currentUser._id, place);
                }
            } else {
                $location.url("/login");
            }
        }

        function followUser(user) {
            $location.url("/follow/" + user.username + "/" + user.userId);
        }

        function likePhoto(post) {
            if(currentUser) {
                $scope.likedPhotos.push(post.photo);
                var photo = {};
                photo.photo = post.photo;
                photo.tags = post.tags;
                photo.userLikes = [];
                photo.userLikes.push(currentUser._id);
                PhotoService.userLikesPhoto(currentUser._id, photo);
                $scope.comment = '';
            } else {
                $location.url("/login");
            }
        }

        function deleteComment(index) {
            if(index > -1) {
                $scope.placeDetails.reviews.splice(index, 1);
                var place = {};
                place.name = $routeParams.name;
                place.place_id = $routeParams.place_id;
                place.thumb = $scope.placeDetails.photo;
                place.vicinity = $scope.placeDetails.address;
                place.lat = lat;
                place.long = long;
                place.reviews = $scope.placeDetails.reviews;
                PlaceService.adminDeletesReview(place);
            }
        }
    }

})();
