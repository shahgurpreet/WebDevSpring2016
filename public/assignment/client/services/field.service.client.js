/**
 * Created by Gurpreet on 3/17/2016.
 */
"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http, $q) {

        var api = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField
        };
        return api;

        function createFieldForForm(formId, field) {
            var endpoint = "/api/assignment/form/" + formId + "/field";
            var req = {
                method: 'POST',
                url: endpoint,
                data: {
                    field: field
                }
            };
            return($http(req));
        }

        function getFieldsForForm(formId) {
            var deferred = $q.defer();
            $http.get("/api/assignment/form/" + formId + "/field")
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error) {
                    console.log(error);
                });

            return deferred.promise;
        }

        function getFieldForForm(formId, fieldId) {
            var deferred = $q.defer();
            $http.get("/api/assignment/form/" + formId + "/field/" + fieldId)
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error) {
                    console.log(error);
                });

            return deferred.promise;
        }

        function deleteFieldFromForm(formId, fieldId) {
            var deferred = $q.defer();
            $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId)
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error) {
                    console.log(error);
                });

            return deferred.promise;
        }

        function updateField(formId, fieldId, field) {
            var endpoint = "/api/assignment/form/" + formId + "/field/" + fieldId;
            var req = {
                method: 'PUT',
                url: endpoint,
                data: {
                    field: field
                }
            };

            return $http(req);
        }
    }
})();