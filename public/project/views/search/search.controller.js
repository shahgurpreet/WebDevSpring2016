/**
 * Created by Gurpreet on 3/3/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("SearchController", SearchController);

    function SearchController($location, $scope, POIService, $routeParams) {
        $scope.city = $routeParams.city;
        $scope.getPOIForCity = getPOIForCity;
        $scope.selectPOI = selectPOI;

        $scope.POIresults = [];

        function getPOIForCity() {
            POIService.findPOIPerCity($scope.city, renderPOI);
        }

        function renderPOI(response) {
            $scope.POIresults = response;
        }

        function selectPOI(poi) {
            $location.url("/details/"+poi.name+"/"+poi.vicinity);
        }

    }

})();
