"use strict";
(function () {
    angular
        .module("WanderMustApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $scope, $rootScope, POIService) {
        $scope.$location = $location;

        $scope.autocompleteOptions = {
            types: ['(cities)']
        };

        $scope.logout = logout;
        $scope.processQuery = processQuery;

        function logout() {
            $rootScope.currentUser = null;
        }

        function processQuery(searchQuery) {
            if(searchQuery) {
                var query = searchQuery;
                $scope.searchQuery = null;
                $location.url("/search/"+query.formatted_address);
            }
        }
    }
})();