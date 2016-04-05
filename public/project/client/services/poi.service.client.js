/**
 * Created by Gurpreet on 3/3/2016.
 */
(function(){
    angular
        .module("WanderMustApp")
        .factory("POIService", POIService);

    function POIService($http,$q) {

        var nextPageToken = '0';
        var api = {
            findPOIPerCity : findPOIPerCity,
            findPhotos: findPhotos,
            getPlaceDetails: getPlaceDetails,
            POIForHome: POIForHome,
            POIForHomeNext: POIForHomeNext,
            POIForCityNext: POIForCityNext,
            getPlaceSummary: getPlaceSummary
        };
        return api;

        function findPhotos(places_1, callback) {
            var promiseArray = [];
            var places = [];
            var photo_place = [];
            for(var i=0; i<places_1.length; i++) {
                var photo = places_1[i].photo;
                var name = places_1[i].name;
                promiseArray.push($http.get("/api/photoPOI/"+ photo + "/" + name).success(function (response) {
                    places.push(response);
                }));
            }
            $q.all(promiseArray).then(function () {
                for(var i = 0; i < places.length; i++) {
                    photo_place[places[i].name] = places[i].photo;
                }

                for(var i = 0; i < places_1.length; i++) {
                    places_1[i].photo = photo_place[places_1[i].name];
                }
                callback(places_1);
            })
        }

        function findPOIPerCity(city, newCity, callback) {
            var places_1;
            var token = '0';
            if(newCity) {
                token = '0';
            } else {
                token = nextPageToken;
            }
            $http.get("/api/poi/" + city + "/" + token).success(function(response) {
                if(response.next_page_token != undefined) {
                    nextPageToken = response.next_page_token;
                } else {
                    nextPageToken = '0';
                }
                var response = response.results;
                places_1 = [];
                for(var r=0; r < response.length; r++) {
                    var place = response[r];
                    var poi = {
                        name: place.name,
                        place_id: place.place_id,
                        vicinity: place.vicinity,
                        lat: place.geometry.location.lat,
                        long: place.geometry.location.lng
                    };
                    if(place.name.toLocaleLowerCase().indexOf('tour') < 0){
                        if(place.types.length > 0) {
                            if(place.types.indexOf('point_of_interest') != -1 &&
                                place.types.indexOf('travel_agency') === -1) {
                                if(place.photos) {
                                    poi.photo = place.photos[0].photo_reference;
                                    places_1.push(poi);
                                }
                            }
                        }
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

        function POIForHome(lat, long, callback) {
            var places = [];
            $http.get("/api/poi/" + lat + "/" + long + "/" + nextPageToken).success(function(response) {
                if(response.next_page_token != undefined) {
                    nextPageToken = response.next_page_token;
                } else {
                    nextPageToken = '0';
                }
                var response = response.results;
                for(var r=0; r < response.length; r++) {
                    var place = response[r];
                    var poi = {
                        name: place.name,
                        place_id: place.place_id,
                        vicinity: place.vicinity,
                        lat: place.geometry.location.lat,
                        long: place.geometry.location.lng
                    };

                    if(place.types.length > 0) {
                        if(place.types.indexOf('point_of_interest') != -1 &&
                            place.types.indexOf('travel_agency') === -1) {
                            if(place.photos) {
                                poi.photo = place.photos[0].photo_reference;
                                places.push(poi);
                            }
                        }
                    }
                }
                callback(places);
            });
        }

        function POIForHomeNext(lat, long, callback) {
            if(nextPageToken != '0') {
                POIForHome(lat, long, nextResults);
                function nextResults(response) {
                    callback(response);
                }
            }
        }

        function POIForCityNext(city, callback) {
            if(nextPageToken != '0') {
                findPOIPerCity(city, false, nextResults);
                function nextResults(response) {
                    callback(response);
                }
            }
        }

        function getPlaceSummary(place, callback) {
            $http.get("/api/wikipedia/" + place).success(function (response) {
                callback(response);
            });
        }
    }
})();
