/**
 * Created by Gurpreet on 2/23/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($location, $scope, $rootScope) {
        $scope.$location = $location;

        if($rootScope.currentUser) {

        }

    }
})();
