/**
 * Created by Gurpreet on 3/3/2016.
 */
"use strict";

(function () {
    angular
        .module("WanderMustApp")
        .factory("InstagramService", InstagramService);

    var insta_id = '523871488.1677ed0.9bffbc141261470493c0ad2e655d92ce';
    var url = 'https://api.instagram.com/v1/locations/';
    var loc_url = 'https://api.instagram.com/v1/locations/search?';
    var photo_url = 'https://api.instagram.com/v1/tags/';

    function InstagramService($http, $resource) {

        var api = {
            getInstaPhotosForLocation : getInstaPhotosForLocation,
            getInstaLocations: getInstaLocations,
            getInstaPhotos: getInstaPhotos
        };

        return api;

        function getInstaLocations(lat, long, name, callback) {
            var s = loc_url + "distance=1000" + "&lat=" + lat + "&lng=" + long + "&access_token=" + insta_id;
            var resource = $resource(s,
                { callback: "JSON_CALLBACK" },
                {
                    getResult: {
                        method: "JSONP"
                    }
                }
            );

            loadRemoteData();
            function loadRemoteData() {
                resource.getResult().$promise.then(
                    function(response) {
                        if(response) {
                            var places = response.data;
                            var endpoint = '/api/similarity/' + name;
                            var req = {
                                method: 'PUT',
                                url: endpoint,
                                data: {
                                    insta_places: places
                                }
                            };
                            $http(req).success(function(response) {
                                callback(response);
                            });
                        }
                    },
                    function( error ) {
                        console.log( "Something went wrong!" );
                    }
                );
            }
        }

        function getInstaPhotosForLocation(locationId, callback) {
            var resource = $resource(url + locationId + "/media/recent" + "?access_token=" + insta_id,
                { callback: "JSON_CALLBACK" },
                {
                    getResult: {
                        method: "JSONP"
                    }
                }
            );

            loadRemoteData();
            function loadRemoteData() {
                resource.getResult().$promise.then(
                    function( response ) {
                        if(response) {
                            response = response.data;
                            var imagesArray = [];
                            for(var i=0; i < response.length; ++i) {
                                var images = response[i].images;
                                imagesArray.push(images.standard_resolution.url);
                            }
                            callback(imagesArray);
                        }
                    },
                    function( error ) {
                        console( "Something went wrong!" );
                    }
                );
            }
        }

        function getInstaPhotos(tag, cfunc){
            photo_url = photo_url + tag + "/" + 'media/recent?access_token=' + insta_id;
            console.log(photo_url);
            var resource = $resource(photo_url,
                { callback: "JSON_CALLBACK" },
                {
                    getResult: {
                        method: "JSONP"
                    }
                }
            );

            loadRemoteData();
            function loadRemoteData() {
                resource.getResult().$promise.then(
                    function( response ) {
                        if(response) {
                            var data = response.data;
                            var imagesArray = [];
                            for(var i=0; i < data.length; ++i) {
                                var images = data[i].images;
                                imagesArray.push(images.standard_resolution.url);
                            }
                            cfunc(imagesArray);
                        }
                    },
                    function( error ) {
                        console.log( "Something went wrong!" );
                    }
                );
            }
        }

    }

})();
