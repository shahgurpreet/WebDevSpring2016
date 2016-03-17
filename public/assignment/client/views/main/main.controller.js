/**
 * Created by Gurpreet on 2/23/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    function MainController($location, $scope, $rootScope, UserService) {
        $scope.$location = $location;
        console.log('here');
        if($rootScope.currentUser) {
            UserService.findUserByUsername($rootScope.currentUser.firstName).then(
                function(response) {
                    console.log(response);
                    $rootScope.currentUser = response;
                }
            )
        }
    }
})();
