"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($location, $scope, POIService, InstagramService, TwitterService, $routeParams) {
        $scope.name = $routeParams.name;
        var name = $routeParams.name;
        var place_id = $routeParams.place_id;
        $scope.getInstagramPhotos = getInstagramPhotos;
        $scope.placeDetails = {};

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
            $scope.placeDetails = placeDetailsArray[0];
        }

        function  getInstagramPhotos() {
            name = $scope.name.replace(/ +/g, "");
            name = name.replace(/\W/g, '')
            name = accentsTidy(name);
            InstagramService.getPhotosForHashTag(name, render);

            function render(response) {
                $scope.instagramImages = [];
                $scope.instagramImages = response;
            }
        }

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
