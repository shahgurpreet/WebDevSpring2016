/**
 * Created by Gurpreet on 2/23/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($location, $scope, $rootScope) {
        $scope.$location = $location;

        var userIsAdmin = false;

        $scope.checkAdmin = function () {
            if($rootScope.currentUser) {
                alert('in');
                var roles = $rootScope.currentUser.roles;
                alert(roles);
                if(roles.indexOf("admin") > -1) {
                    alert('etf');
                    $scope.userIsAdmin = true;
                }
            }

            return userIsAdmin;
        }
    }
})();
