/**
 * Created by Gurpreet on 3/3/2016.
 */
(function () {
    angular
        .module("WanderMustApp")
        .factory("InstagramService", InstagramService);


    var insta_id = '523871488.1677ed0.9bffbc141261470493c0ad2e655d92ce';
    var url = 'https://api.instagram.com/v1/locations/';
    var loc_url = 'https://api.instagram.com/v1/locations/search?';
    var photo_url = 'https://api.instagram.com/v1/tags/token';


    function InstagramService($http, $resource) {
        var nextPageToken = '0';
        var api = {
            getInstaPhotosForLocation : getInstaPhotosForLocation,
            getInstaLocations: getInstaLocations,
            getInstaPhotos: getInstaPhotos,
            instaNext: instaNext
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

        function getInstaPhotos(tag, newInsta, callback){
            var token = '0';
            if(newInsta) {
                token = '0';
            } else {
                token = nextPageToken;
            }
            $http.get('/api/instagram/' + tag + "/" + token).success(function(response) {
                if(response) {
                    if(response.pagination != undefined) {
                        if(response.pagination.next_url != undefined) {
                            nextPageToken = response.pagination.next_max_tag_id;
                        } else {
                            nextPageToken = '0';
                        }
                    }
                    var data = response.data;
                    if(data) {
                        var instaPosts = [];
                        for(var i=0; i < data.length; ++i) {
                            var images = data[i].images;
                            var tags = data[i].tags;
                            instaPosts.push({
                                tags: tags,
                                photo: images.standard_resolution.url
                            });
                        }
                        callback(instaPosts);
                    }
                }
            }).error(function(error) {
               console.log(error);
            });
        }

        function instaNext(tag, callback) {
            if(nextPageToken != '0') {
                getInstaPhotos(tag, false, nextResults);
                function nextResults(response) {
                    callback(response);
                }
            } else {
                callback([]);
            }
        }

    }

})();
