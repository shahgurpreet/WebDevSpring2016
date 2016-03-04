/**
 * Created by Gurpreet on 3/3/2016.
 */
"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .factory("InstagramService", InstagramService);

    var insta_id = '523871488.1677ed0.9bffbc141261470493c0ad2e655d92ce';
    var url = 'https://api.instagram.com/v1/tags/';

    function InstagramService($http, $resource) {

        var api = {
            getPhotosForHashTag : getPhotosForHashTag
        };

        return api;

        function getPhotosForHashTag(tag, callback) {
            console.log(tag);
            var resource = $resource(url + tag + "/media/recent" + "?access_token=" + insta_id,
                { callback: "JSON_CALLBACK" },
                {
                    getFriends: {
                        method: "JSONP"
                    }
                }
            );

            loadRemoteData();


            function loadRemoteData() {
                resource.getFriends().$promise.then(
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
                        alert( "Something went wrong!" );
                    }
                );
            }





/*            console.log('in service');
            url = url + tag + "/media/recent";

            $http.jsonp(url + "?callback=JSON_CALLBACK" + "&access_token=" + insta_id).success(function(response) {
                if(response) {
                    response = response.data;
                    var imagesArray = [];
                    for(var i=0; i < response.length; ++i) {
                        var images = response[i].images;
                        imagesArray.push(images.standard_resolution.url);
                    }
                    callback(imagesArray);
                }
            });*/




        }
    }

})();
