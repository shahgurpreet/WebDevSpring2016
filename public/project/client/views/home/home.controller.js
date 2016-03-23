"use strict";
(function () {
    angular
        .module("WanderMustApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $location, POIService) {
        $scope.HomePOIresults = [];
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

        function showPosition(position) {
            $scope.$apply();
            POIService.POIForHome(position.coords.latitude,position.coords.longitude, processPOI);

            function processPOI(response) {
                POIService.findPhotos(response, renderPOI);
            }

            function renderPOI(poi) {
                $scope.HomePOIresults = poi;
            }
        }

        function selectPOI(poi) {
            $location.url("/details/"+poi.name+"/"+poi.vicinity+"/"+poi.place_id);
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