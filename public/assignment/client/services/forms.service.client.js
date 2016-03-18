/**
 * Created by Gurpreet on 2/25/2016.
 */

"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http, $q) {

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return api;

        function createFormForUser(userId, form) {
            var endpoint = "/api/assignment/user/" + userId + "/form";
            var req = {
                method: 'POST',
                url: endpoint,
                data: {
                    form: form
                }
            };
            return($http(req));
        }

        function findAllFormsForUser(userId) {
            var deferred = $q.defer();
            $http.get("/api/assignment/user/:userId/" + userId + "/form")
                .success(function (response) {
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function deleteFormById(formId) {
            var deferred = $q.defer();
            $http.get("/api/assignment/form/" + formId)
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error) {
                    console.log(error);
                });

            return deferred.promise;
        }

        function updateFormById(formId, newForm) {
            var endpoint = "/api/assignment/form/" + formId;
            var req = {
                method: 'PUT',
                url: endpoint,
                data: {
                    form: newForm
                }
            };

            return $http(req);
        }

    }
})();

