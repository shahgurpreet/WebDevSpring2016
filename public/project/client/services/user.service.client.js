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
            getReviewedPlaces: getReviewedPlaces,
            getUsernamesByIds: getUsernamesByIds,
            getLikedPlacesForUsername: getLikedPlacesForUsername,
            getLikedPhotos: getLikedPhotos,
            followUser: followUser
        };
        return api;

        // follow user by username
        function followUser(userId, followUserName) {
            var endpoint = "/api/project/user/follow/" + userId +"/" + followUserName;
            var req = {
                method: 'POST',
                url: endpoint
            };

            return $http(req);
        }

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
        function getLikedPlaces(userId) {
            if(userId) {
                return $http.get("/api/project/liked/"+userId);
            }
            return $http.get("/api/project/liked/"+$rootScope.currentUser._id);
        }

        // fetch the reviewed places
        function getReviewedPlaces(userId) {
            if(userId) {
                return $http.get("/api/project/reviewed/"+userId);
            }
            return $http.get("/api/project/reviewed/"+$rootScope.currentUser._id);
        }

        // fetch usernames by userIds
        function getUsernamesByIds(userIds) {
            var endpoint = "/api/project/userid/username";
            var req = {
                method: 'POST',
                url: endpoint,
                data: {
                    userIds: userIds
                }
            };

            return $http(req);
        }

        function getLikedPlacesForUsername(username) {
            return $http.get("/api/project/reviewed/"+$rootScope.currentUser._id);
        }

        // fetch the liked photos
        function getLikedPhotos(userId) {
            if(userId) {
                return $http.get("/api/project/liked/photos/"+userId);
            }
            return $http.get("/api/project/liked/photos/"+$rootScope.currentUser._id);
        }
    }
})();
