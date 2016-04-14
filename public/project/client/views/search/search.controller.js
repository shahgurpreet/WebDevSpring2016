/**
 * Created by Gurpreet on 3/3/2016.
 */
"use strict";
(function () {
    angular
        .module("WanderMustApp")
        .controller("SearchController", SearchController);

    function SearchController($location, $scope, POIService, $routeParams, $window) {
        $scope.city = $routeParams.city;
        $scope.selectPOI = selectPOI;
        $scope.POIresults = [];
        $scope.POINextresults = [];
        $scope.myPagingFunction = myPagingFunction;
        $scope.more = false;
        $scope.loading = true;
        $scope.noResultsFound = false;

        function myPagingFunction() {
            $scope.more = false;
            POIService.POIForCityNext($scope.city, processNextPOI);
            function processNextPOI(response) {
                if(response.length > 0) {
                    POIService.findPhotos(response, renderNextPOI);
                } else {
                    $scope.loading = false;
                }
            }
            function renderNextPOI(response) {
                for(var i in response) {
                    $scope.POINextresults.push(response[i]);
                }
                var arrResult = {};
                for (var j = 0; j < $scope.POINextresults.length; j++){
                    var item = $scope.POINextresults[j];
                    arrResult[ item.photo + " - " + item.name ] = item;
                }
                var i = 0;
                var nonDuplicatedArray = [];
                for(var item in arrResult) {
                    nonDuplicatedArray[i++] = arrResult[item];
                }
                $scope.POIresults = nonDuplicatedArray;
                setTimeout(function () {
                    $scope.$apply(function(){
                        $scope.more = true;
                    });
                }, 2000);
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
            $scope.POINextresults = $scope.POIresults;
            if($scope.POINextresults.length > 0) {
                setTimeout(function () {
                    $scope.$apply(function(){
                        $scope.more = true;
                    });
                }, 2000);
            } else {
                $scope.noResultsFound = true;
            }
        }

        function selectPOI(poi) {
            $location.url("/details/"+poi.name+"/"+poi.vicinity+"/"+poi.place_id + "/" + poi.lat + "/" + poi.long);
        }

    }

})();
