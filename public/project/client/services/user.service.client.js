/**
 * Created by Gurpreet on 2/23/2016.
 */

"use strict";

(function(){
    angular
        .module("WanderMustApp")
        .factory("UserService", UserService);

    function UserService($http, $q, $rootScope) {

        var api = {
            findUserByCredentials: findUserByCredentials,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            logout: logout,
            getLikedPlaces: getLikedPlaces,
            getReviewedPlaces: getReviewedPlaces
        };
        return api;

        // get all users
        function findAllUsers() {
            var deferred = $q.defer();
            $http.get("/api/project/user")
                .success(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        // find user by username
        function findUserByUsername(username) {
            var deferred = $q.defer();
            $http.get("/api/project/user?username=" + username)
                .success(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        // find user by credentials
        function findUserByCredentials(username, password) {
            var deferred = $q.defer();
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/project/login", user);
        }

        // register user
        function createUser(user) {
            var endpoint = "/api/project/user";
            var req = {
                method: 'POST',
                url: endpoint,
                data: {
                    user: user
                }
            };
            return($http(req));
        }

        // delete user by user id
        function deleteUserById(userId) {
            var deferred = $q.defer();
            $http.delete("/api/project/user/" + userId)
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error) {
                    console.log(error);
                });

            return deferred.promise;
        }

        // update user by user obj and user id
        function updateUser(userId, user) {
            var endpoint = "/api/project/user/" + userId;
            var req = {
                method: 'PUT',
                url: endpoint,
                data: {
                    user: user
                }
            };

            return $http(req);
        }

        // logout user
        function logout() {
            return $http.post("/api/project/logout");
        }

        // fetch the liked places
        function getLikedPlaces() {
            return $http.get("/api/project/liked/"+$rootScope.currentUser._id);
        }

        // fetch the reviewed places
        function getReviewedPlaces() {
            return $http.get("/api/project/reviewed/"+$rootScope.currentUser._id);
        }
    }
})();
