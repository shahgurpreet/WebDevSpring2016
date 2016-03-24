"use strict";

(function () {
    angular
        .module("WanderMustApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, POIService, InstagramService, $routeParams, TwitterService) {
        $scope.name = $routeParams.name;
        var name = $routeParams.name;
        var place_id = $routeParams.place_id;
        var lat = $routeParams.lat;
        var long = $routeParams.long;
        $scope.getInstagramPhotos = getInstagramPhotos;
        $scope.instagramImages = [];
        $scope.twitterImages = [];

        var getPlaceDetails = function() {
            POIService.getPlaceDetails(place_id, processPlaceDetails);
        };

        getPlaceDetails();


        function processPlaceDetails(placeDetails) {
            var places = [];
            places.push(placeDetails);
            POIService.findPhotos(places, renderPlaceDetails);
        }

        function renderPlaceDetails(placeDetailsArray) {
            $scope.placeDetails = {};
            $scope.placeDetails = placeDetailsArray[0];
        }

        function  getInstagramPhotos() {
            $scope.name = $routeParams.name;
            name = $scope.name.replace(/ +/g, "");
            name = name.replace(/\W/g, '')
            name = accentsTidy(name);
            /*InstagramService.getInstaLocations(lat, long, $scope.name, processInstaLocationId);

             function processInstaLocationId(response) {
             var instaLocationId = response;
             InstagramService.getInstaPhotosForLocation(instaLocationId, render);
             }

             function render(response) {
             $scope.instagramImages = response;
             }*/
            InstagramService.getInstaPhotos(name, renderInsta);

            function renderInsta(response) {
                $scope.instagramImages = response;
            }
        }

        getInstagramPhotos();

        function getTwitterPosts() {
            TwitterService.getTwitterPosts($routeParams.name, render);

            function render(response) {
                $scope.twitterImages = response;
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
    }

})();
