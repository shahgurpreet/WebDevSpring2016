"use strict";
(function () {
    angular
        .module("WanderMustApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $scope, $rootScope, UserService) {
        $scope.$location = $location;

        $scope.autocompleteOptions = {
            types: ['(cities)']
        };

        $scope.logout = logout;
        $scope.processQuery = processQuery;

        function logout()
        {
            UserService
                .logout()
                .then(
                    function(response){
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
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