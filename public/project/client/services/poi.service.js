/**
 * Created by Gurpreet on 3/3/2016.
 */
"use strict";

(function(){
    angular
        .module("WanderMustApp")
        .factory("POIService", POIService);

    function POIService($http,$q) {

        var api = {
            findPOIPerCity : findPOIPerCity,
            findPhotos: findPhotos,
            getPlaceDetails: getPlaceDetails
        };
        return api;

        function findPhotos(places_1, callback) {
            var promiseArray = [];
            var places = [];
            for(var i=0; i<places_1.length; i++) {
                var photo = places_1[i].photo;
                promiseArray.push($http.get("/api/photoPOI/"+ photo).success(function (response) {
                    places.push(response);
                }));
            }

            $q.all(promiseArray).then(function () {
                for(var i = 0; i < places_1.length; i++) {
                    var newPhoto = places[i];
                    places_1[i].photo = newPhoto;
                }
                callback(places_1);
            })
        }

        function findPOIPerCity(city, callback) {
            var deferred = $q.defer();
            var places_1;
            var promiseArray = [];
            $http.get("/api/poi/" + city).success(function(response) {
                var response = response.results;
                places_1 = [];
                for(var r=0; r < response.length; r++) {
                    var place = response[r];
                    var poi = {
                        name: place.name,
                        place_id: place.place_id,
                        vicinity: place.vicinity
                    };
                    if(place.photos) {
                        poi.photo = place.photos[0].photo_reference;
                        places_1.push(poi);
                    }
                }
                callback(places_1);
            });
        }

        function getPlaceDetails(place_id, callback) {
            var placeDetails = {};
            $http.get("/api/place/" + place_id).success(function (response) {
                var result = response.result;
                var formattedAddress = result.formatted_address;
                var phone = result.international_phone_number;
                var name = result.name;
                var photoReference = result.photos[0].photo_reference;
                var reviews = result.reviews;
                var website = result.website;
                var rating = result.rating;

                placeDetails = {
                    name: name,
                    phone: phone,
                    address: formattedAddress,
                    photo: photoReference,
                    reviews: reviews,
                    website: website,
                    rating: rating
                };

                callback(placeDetails);
            });
        }
    }
})();
