"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($location, $scope, InstagramService, TwitterService, $routeParams) {
        $scope.name = $routeParams.name;
        var name = $routeParams.name;
        name = $scope.name.replace(/ +/g, "");
        name = name.replace(/\W/g, '')
        $scope.getInstagramPhotos = getInstagramPhotos;

        function  getInstagramPhotos() {
            InstagramService.getPhotosForHashTag(name, render);

            function render(response) {
                $scope.instagramImages = [];
                $scope.instagramImages = response;
            }
        }

    }

})();
