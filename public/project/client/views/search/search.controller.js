/**
 * Created by Gurpreet on 3/3/2016.
 */
"use strict";
(function () {
    angular
        .module("WanderMustApp")
        .controller("SearchController", SearchController);

    function SearchController($location, $scope, POIService, $routeParams, $timeout) {
        $scope.city = $routeParams.city;
        $scope.selectPOI = selectPOI;
        $scope.POIresults = [];
        $scope.myPagingFunction = myPagingFunction;

        function myPagingFunction() {
            $scope.loading = true;
            POIService.POIForCityNext($scope.city, processNextPOI);
            setTimeout(function () {
                $scope.$apply(function(){
                    $scope.loading = false;
                });
            }, 2000);
            function processNextPOI(response) {
                POIService.findPhotos(response, renderNextPOI);
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
        }

        function selectPOI(poi) {
            $location.url("/details/"+poi.name+"/"+poi.vicinity+"/"+poi.place_id + "/" + poi.lat + "/" + poi.long);
        }

    }

})();
