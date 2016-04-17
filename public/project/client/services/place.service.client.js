/**
 * Created by Gurpreet on 4/11/2016.
 */
(function(){
    angular
        .module("WanderMustApp")
        .factory("PlaceService", placeService);

    function placeService($http) {
        var api = {
            userLikesPlace: userLikesPlace,
            findUserLikes: findUserLikes,
            userCommentsOnPlace: userCommentsOnPlace,
            findPlaceById: findPlaceById,
            adminDeletesReview: adminDeletesReview
        };
        return api;

        function adminDeletesReview(place) {
            return $http.post("/api/project/place/admin/review/", place);
        }

        function findUserLikes (place_id) {
            return $http.get("/api/project/place/"+place_id+"/user");
        }

        function userLikesPlace(userId, place) {
            return $http.post("/api/project/user/"+userId+"/place/"+place.place_id, place);
        }

        function userCommentsOnPlace(userId, place) {
            return $http.post("/api/project/user/"+userId+"/comment/place/"+place.place_id, place);
        }

        function findPlaceById(place_id) {
            return $http.get("/api/project/place/details/"+place_id);
        }
    }
})();