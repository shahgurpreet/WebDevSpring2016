"use strict";
(function () {
    angular
        .module("WanderMustApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $location, POIService, $window) {
        $scope.myPagingFunction = myPagingFunction;
        $scope.HomePOIresults = [];
        var lat, long;
        $scope.selectPOI = selectPOI;
        function getCurrentPosition() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else {
                $scope.loader = false;
                $scope.error = "Geolocation is not supported by this browser";
                $scope.showErr = true;
            }
        }

        getCurrentPosition();


        function myPagingFunction() {
            console.log('called');
            POIService.POIForHomeNext($scope.lat,$scope.long, processNextPOI);

            function processNextPOI(response) {
                POIService.findPhotos(response, renderNextPOI);
            }

            function renderNextPOI(response) {
                for(var i in response) {
                    $scope.HomePOIresults.push(response[i]);
                }
            }

        }

        function showPosition(position) {
            $scope.$apply();
            $scope.lat = position.coords.latitude;
            $scope.long = position.coords.longitude;
            POIService.POIForHome(position.coords.latitude,position.coords.longitude, processPOI);
        }

        function processPOI(response) {
            POIService.findPhotos(response, renderPOI);
        }

        function renderPOI(poi) {
            $scope.HomePOIresults = poi;
        }

        function selectPOI(poi) {
            $location.url("/details/"+poi.name+"/"+poi.vicinity+"/"+poi.place_id+"/"+poi.lat
            +"/"+poi.long);
        }

        function showError(error) {
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
            $scope.$apply();
        }
    }
})();