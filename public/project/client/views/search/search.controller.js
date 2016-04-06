/**
 * Created by Gurpreet on 3/3/2016.
 */
"use strict";
(function () {
    angular
        .module("WanderMustApp")
        .controller("SearchController", SearchController);

    function SearchController($location, $scope, POIService, $routeParams) {
        $scope.city = $routeParams.city;
        $scope.selectPOI = selectPOI;
        $scope.POIresults = [];
        $scope.myPagingFunction = myPagingFunction;

        function myPagingFunction() {
            POIService.POIForCityNext($scope.city, processNextPOI);

            function processNextPOI(response) {
                POIService.findPhotos(response, renderNextPOI);
            }

            function renderNextPOI(response) {
                for(var i in response) {
                    $scope.POIresults.push(response[i]);
                }
            }

        }

        var getPOIForCity = function() {
            POIService.findPOIPerCity($scope.city, true, processPOI);
        };

        getPOIForCity();

        function processPOI(response) {
            POIService.findPhotos(response, renderPOI);
        }

        function renderPOI(poi) {
            $scope.POIresults = poi;
        }

        function selectPOI(poi) {
            $location.url("/details/"+poi.name+"/"+poi.vicinity+"/"+poi.place_id + "/" + poi.lat + "/" + poi.long);
        }

    }

})();
