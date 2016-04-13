(function () {
    angular
        .module("WanderMustApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, $rootScope, $location, POIService, InstagramService, TwitterService, PlaceService, $routeParams, $timeout, $sce) {
        $scope.name = $routeParams.name;
        $scope.getInstagramPhotos = getInstagramPhotos;
        $scope.instagramImagesAndTags = [];
        $scope.twitterPosts = [];
        $scope.noMoreTwitterData = false;
        $scope.noMoreInstaData = false;
        $scope.favorite = favorite;
        $scope.addComment = addComment;

        var name = $routeParams.name;
        var place_id = $routeParams.place_id;
        var lat = $routeParams.lat;
        var long = $routeParams.long;

        $scope.paging = function(){
            if($scope.name != undefined) {
                InstagramService.instaNext($scope.name, getMorePhotos);
                function getMorePhotos(response) {
                    console.log(response);
                    $timeout(function(){
                        if(response.length === 0) {
                            $scope.noMoreInstaData = true;
                        }
                        var instaPosts = response;
                        for(var i = 0; i < instaPosts.length; i++) {
                            var tag = '';
                            var tags = instaPosts[i].tags;
                            for(var j = 0; j < tags.length; j++) {
                                tag += '#' + tags[j] + ' ';
                            }
                            $scope.instagramImagesAndTags.push({
                                tags: tag,
                                photo: instaPosts[i].photo
                            });
                        }
                    });

                }
            }
        };

        $scope.pagingTwitter = function() {
            if($scope.name != undefined) {
                TwitterService.twitterNext($scope.name, getMoreTweets);
                function getMoreTweets(response) {
                    if(response.length === 0) {
                        $scope.noMoreTwitterData = true;
                    }
                    $timeout(function(){
                        for(var i in response) {
                            $scope.twitterPosts.push(response[i]);
                        }
                    });

                }
            }
        };

        var getPlaceDetails = function() {
            POIService.getPlaceDetails(place_id, processPlaceDetails);
        };

        getPlaceDetails();

        var currentUser = $rootScope.currentUser;

        var init = function() {
            PlaceService
                .findUserLikes (place_id)
                .then(function(response){
                    $scope.place = response.data;
                });
        };
        init();

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
        }

        function  getInstagramPhotos() {
            $scope.name = $routeParams.name;
            $scope.name = $scope.name.replace(/ +/g, "");
            $scope.name = name.replace(/\W/g, '')
            //name = accentsTidy(name);

            InstagramService.getInstaPhotos($scope.name, true, renderInsta);

            function renderInsta(response) {
                if(response.length === 0) {
                    $scope.noMoreInstaData = true;
                }
                $timeout(function(){
                    var instaPosts = response;
                    for(var i = 0; i < instaPosts.length; i++) {
                        var tag = '';
                        var tags = instaPosts[i].tags;
                        for(var j = 0; j < tags.length; j++) {
                            tag += '#' + tags[j] + ' ';
                        }
                        $scope.instagramImagesAndTags.push({
                            tags: tag,
                            photo: instaPosts[i].photo
                        });
                    }
                });

            }
        }

        getInstagramPhotos();

        function getTwitterPosts() {
            TwitterService.getTwitterPosts($routeParams.name, true, render);

            function render(response) {
                if(response.length === 0) {
                    $scope.noMoreTwitterData = true;
                }
                $scope.twitterPosts = response;
            }
        }

        getTwitterPosts();

        function accentsTidy(name) {
            var r = name.toLowerCase();
            var non_asciis = {'a': '[àáâãäå]', 'ae': 'æ', 'c': 'ç', 'e': '[èéêë]', 'i': '[ìíîï]', 'n': 'ñ', 'o': '[òóôõö]', 'oe': 'œ', 'u': '[ùúûűü]', 'y': '[ýÿ]'};

            for(var i = 0; i < non_asciis.length; i++) {
                var non_ascii_val = non_asciis[i];
                r = r.replace(new RegExp(non_ascii_val[i], 'g'), non_ascii_val
                );
            }
            return r;
        }

        function favorite(place1) {
            if(currentUser) {
                var place = {};
                place.likes = [];
                $scope.place.likes = [];
                $scope.place.likes.push(currentUser._id);
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
            if(currentUser) {
                if(comment) {
                    $scope.newComment = null;
                    $scope.placeDetails.reviews.push(comment);
                    var place = {};
                    place.name = $routeParams.name;
                    place.place_id = $routeParams.place_id;
                    place.thumb = $scope.placeDetails.photo;
                    place.vicinity = $scope.placeDetails.address;
                    place.lat = lat;
                    place.long = long;
                    place.reviews = $scope.placeDetails.reviews;

                    PlaceService.userCommentsOnPlace(currentUser._id, place);
                }
            } else {
                $location.url("/login");
            }
        }
    }

})();
