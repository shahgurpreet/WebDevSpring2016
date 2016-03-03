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

        function getPOIForCity() {
            POIService.findPOIPerCity($scope.city, renderPOI);
        }

        function renderPOI(response) {
            console.log(response);
            $scope.POIresults = response;
        }

    }

})();
