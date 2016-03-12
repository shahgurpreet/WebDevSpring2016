/**
 * Created by Gurpreet on 2/23/2016.
 */
"use strict";
(function () {
    angular
        .module("WanderMustApp")
        .controller("MainController", MainController);

    function MainController($location, $scope) {
        $scope.$location = $location;
    }
})();
