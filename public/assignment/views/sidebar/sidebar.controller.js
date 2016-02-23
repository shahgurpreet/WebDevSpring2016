/**
 * Created by Gurpreet on 2/23/2016.
 */
/**
 * Created by Gurpreet on 2/23/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($location, $scope) {
        $scope.$location = $location;
    }
})();
