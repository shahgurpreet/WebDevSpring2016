/**
 * Created by Gurpreet on 3/3/2016.
 */
"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .factory("POIService", POIService);

    var api_key = 'AIzaSyD8M-KBuFrLLvqhQ5eMTpOMXhamomRfwZ4';
    var endpoint = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=500&location=' + '-33.8670522,151.1957362&key='+ api_key;

    function POIService($http) {

        var api = {
            findPOIPerCity : findPOIPerCity
        };
        return api;

        function findPOIPerCity(city, callback) {

            $http({
                method: 'JSONP',
                url: endpoint
            }).
            success(function(status) {
                //your code when success
            }).
            error(function(status) {
                //your code when fails
            });
        }
    }
})();
