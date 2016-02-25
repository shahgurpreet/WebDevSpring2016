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

        var currentUserId = $rootScope.currentUser._id;
        $scope.allForms = FormService.findAllFormsForUser(currentUserId, getAllForms);

        function getAllForms(allForms) {
            $scope.allForms = allForms;
        }

        // event handler implementation
        function addForm(inputForm){
            FormService.createFormForUser(currentUserId, inputForm, doSomething);


        }

        function updateForm(){

        }

        function deleteForm() {

        }

        function selectForm() {

        }
    }

})();
