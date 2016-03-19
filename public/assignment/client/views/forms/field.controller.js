/**
 * Created by Gurpreet on 2/23/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($routeParams, $scope, $rootScope, FieldService) {

        $scope.sortableOptions = {
            handle: '.myHandle'
        };

        $scope.allFields = [];
        var formId = $routeParams.formId;
        function getFieldsForForm(formId) {
            FieldService.getFieldsForForm(formId).then(
                function(response) {
                    $scope.allFields = response;
                }
            )
        }

        getFieldsForForm(formId);

        // event handler declarations
        $scope.addField = addField;
        $scope.deleteFieldFromForm = deleteFieldFromForm;
        $scope.createReplicaForm = createReplicaForm;

        // event handler implementations

        function addField(selection) {
            var field= {};
            if(selection === "slt") {
                field = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
            } else if(selection === "mlt") {
                field = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
            } else if(selection === "date") {
                field = {"_id": null, "label": "New Date Field", "type": "DATE"};
            } else if(selection === "drop") {
                field = {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ]};
            } else if(selection === "cb") {
                field = {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ]};
            } else if(selection === "rb") {
                field = {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ]};
            }

            FieldService.createFieldForForm(formId, field).then(
                function(response) {
                    getFieldsForForm(formId);
                }
            )
        }

        function deleteFieldFromForm(index) {
            if(index > -1) {
                var fieldId = $scope.allFields[index]._id;;
                FieldService.deleteFieldFromForm(formId, fieldId).then(
                    function(response) {
                        getFieldsForForm(formId);
                    }
                )
            }
        }

        function createReplicaForm(fieldId) {
            FieldService.createReplicaForm(formId, fieldId).then(
                function (response) {
                    getFieldsForForm(formId);
                }
            )
        }
    }

})();