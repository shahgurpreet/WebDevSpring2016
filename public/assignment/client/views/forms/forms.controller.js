/**
 * Created by Gurpreet on 2/23/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($location, $scope, $rootScope, FormService) {

        // event handler declarations
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.getAllFormsForCurrentUser = getAllFormsForCurrentUser;

        $scope.inputForm = {};
        $scope.allForms = {};
        $scope.selectedFormIndex = -1;
        var currentUserId = $rootScope.currentUser._id;


        function getAllFormsForCurrentUser() {
            FormService.findAllFormsForUser(currentUserId).then(
                function (response) {
                    $scope.allForms = response;
                }
            )
        }

        // event handler implementation
        function addForm(title){
            var newForm = {};
            if(title) {
                newForm.title = title;
                FormService.createFormForUser(currentUserId, newForm).then(
                    function(response) {
                        getAllFormsForCurrentUser();
                        $scope.inputForm = {};
                    }
                )
            }
        }

        function updateForm(formTitle){
            var oldForm = $scope.allForms[$scope.selectedFormIndex];
            var updatedForm = null;
            var formId = null;
            if(formTitle) {
                oldForm.title = formTitle;
                FormService.updateFormById(oldForm._id, oldForm).then(
                    function(response) {
                        $scope.inputForm = {};
                    }
                )
            }
        }

        function deleteForm(index) {
            if(index > -1) {
                var formId = $scope.allForms[index]._id;;
                FormService.deleteFormById(formId).then(
                    function(response) {
                        getAllFormsForCurrentUser();
                    }
                )
            }
        }

        function selectForm(index) {
            var allForms = $scope.allForms;
            var form = allForms[index];
            $scope.inputForm.title = form.title;
            $scope.selectedFormIndex = index;
        }
    }

})();
