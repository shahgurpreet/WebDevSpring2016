/**
 * Created by Gurpreet on 4/14/2016.
 */
(function () {
    angular
        .module("WanderMustApp")
        .factory("PhotoService", PhotoService);

    function PhotoService($http) {
        var api = {
            userLikesPhoto: userLikesPhoto
        };

        return api;

        function userLikesPhoto(userId, photo) {
            return $http.post("/api/project/photo/" + userId, photo);
        }
    }

})();