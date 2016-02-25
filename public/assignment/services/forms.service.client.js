/**
 * Created by Gurpreet on 2/25/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    var allForms = [
        {"_id": "000", "title": "Contacts", "userId": 123},
        {"_id": "010", "title": "ToDo",     "userId": 123},
        {"_id": "020", "title": "CDs",      "userId": 234},
    ];

    function FormService() {

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return api;

        function createFormForUser(userId, form, callback) {
            var _id = new Date().getTime();
            form._id = _id;
            form.userId = userId;
            allForms.push(form);

            callback(form);
        }

        function findAllFormsForUser(userId, callback) {
            var userForms = [];
            for(var i in allForms) {
                var form = allForms[i];
                if(form.userId === userId) {
                    userForms.push(form);
                }
            }

            callback(userForms);
        }

        function deleteFormById(formId, callback) {
            var removeIndex = -1;
            for(var i in allForms) {
                var form = allForms[i];
                if(form._id === formId) {
                    removeIndex = i;
                    break;
                }
            }

            if (removeIndex > -1) {
                allForms.splice(removeIndex, 1);
            }

            callback(allForms);
        }

        function updateFormById(formId, newForm, callback) {
            for(var i in allForms) {
                var form = allForms[i];
                if(form._id === formId) {
                    allForms[i] = newForm;
                }
            }

            callback(newForm);
        }

    }
})();

