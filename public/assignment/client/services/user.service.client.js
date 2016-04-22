/**
 * Created by Gurpreet on 2/23/2016.
 */

"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $q) {

        var api = {
            findUserByCredentials: findUserByCredentials,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            logout: logout
        };
        return api;

        // get all users
        function findAllUsers() {
            var deferred = $q.defer();
            $http.get("/api/assignment/user")
                .success(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        // find user by username
        function findUserByUsername(username) {
            var deferred = $q.defer();
            $http.get("/api/assignment/user?username=" + username)
                .success(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        // find user by credentials
        function findUserByCredentials(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/assignment/login", user);
        }

        // register user
        function createUser(user) {
            var endpoint = "/api/assignment/user";
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
            $http.delete("/api/assignment/user/" + userId)
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
            var endpoint = "/api/assignment/user/" + userId;
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
            return $http.post("/api/assignment/logout");
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
    }
})();
