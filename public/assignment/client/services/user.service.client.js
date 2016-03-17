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
            findAllUsers: findAllUsers
        };
        return api;

        function findAllUsers() {
            var deferred = $q.defer();
            $http.get("/api/assignment/user")
                .success(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function findUserByUsername(username) {
            var deferred = $q.defer();
            $http.get("/api/assignment/user?username=" + username)
                .success(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function findUserByCredentials(username, password) {
            var deferred = $q.defer();
            $http.get("/api/assignment/user?username=" + username + "&password=" + password)
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error) {
                    console.log(error);
                });

            return deferred.promise;
        }

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

        function deleteUserById(userId) {
            var deferred = $q.defer();
            $http.get("/api/assignment/user/" + userId)
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error) {
                    console.log(error);
                });

            return deferred.promise;
        }

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
    }
})();
