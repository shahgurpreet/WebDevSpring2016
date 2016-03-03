"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $scope, $rootScope, POIService) {
        $scope.$location = $location;


        $scope.logout = logout;
        $scope.processQuery = processQuery;

        function logout() {
            $rootScope.currentUser = null;
        }

        function processQuery(searchQuery) {
            POIService.findPOIPerCity(searchQuery, render);
        }

        function render(response) {
            console.log(response);
        }
    }
})();