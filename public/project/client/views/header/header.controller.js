"use strict";
(function () {
    angular
        .module("WanderMustApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $scope, $rootScope, POIService) {
        $scope.$location = $location;


        $scope.logout = logout;
        $scope.processQuery = processQuery;

        function logout() {
            $rootScope.currentUser = null;
        }

        function processQuery(searchQuery) {
            if(searchQuery) {
                $location.url("/search/"+searchQuery);
            }
        }
    }
})();