"use strict";
(function () {
    angular
        .module("WanderMustApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $location, POIService, $window, $timeout) {
        $scope.HomePOIresults = [];
        $scope.selectPOI = selectPOI;
        $scope.more = false;
        $scope.noResultsFound = false;
        $scope.loading = true;
        $scope.error = undefined;


        function getCurrentPosition() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else {
                $scope.error = "Geolocation is not supported by this browser";
                $scope.showErr = true;
            }
        }

        getCurrentPosition();


        $scope.myPagingFunction = function() {
            $scope.more = false;
            POIService.POIForHomeNext($scope.lat,$scope.long, processNextPOI);

            function processNextPOI(response) {
                if(response.length > 0) {
                    POIService.findPhotos(response, renderNextPOI);
                } else {
                    $scope.loading = false;
                }

            }

            function renderNextPOI(response) {
                for(var i in response) {
                    $scope.HomePOIresults.push(response[i]);
                    setTimeout(function () {
                        $scope.$apply(function(){
                            $scope.more = true;
                        });
                    }, 2000);
                }
            }

        };

        function showPosition(position) {
            $scope.lat = position.coords.latitude;
            $scope.long = position.coords.longitude;
            POIService.POIForHome(position.coords.latitude,position.coords.longitude, processPOI);
        }

        function processPOI(response) {
            POIService.findPhotos(response, renderPOI);
        }

        function renderPOI(poi) {
            $scope.HomePOIresults = poi;
            $scope.POINextresults = $scope.HomePOIresults;
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
            $location.url("/details/"+poi.name+"/"+poi.vicinity+"/"+poi.place_id+"/"+poi.lat
            +"/"+poi.long);
        }

        function showError(error) {
            $scope.loading = false;
            $scope.showErr = true;
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    $scope.error = "User denied the request for Geolocation.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    $scope.error = "Location information is unavailable.";
                    break;
                case error.TIMEOUT:
                    $scope.error = "The request to get user location timed out.";
                    break;
                case error.UNKNOWN_ERROR:
                    $scope.error = "An unknown error occurred.";
                    break;
            }
            console.log($scope.error);
            $scope.$apply();
        }
    }
})();