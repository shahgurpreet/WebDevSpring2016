/**
 * Created by Gurpreet on 2/23/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $scope, $rootScope) {
        $scope.$location = $location;

        $scope.logout = logout;

        function logout() {
            $rootScope.currentUser = null;
        }
    }
})();