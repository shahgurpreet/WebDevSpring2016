/**
 * Created by Gurpreet on 3/15/2016.
 */
module.exports = function(app) {

    var fs = require('fs');
    var uuid = require('node-uuid');
    var formJSON = JSON.parse(fs.readFileSync("./public/assignment/server/models/form.mock.json"));

    var api = {
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        updateFormById:updateFormById,
        deleteFormById:deleteFormById,
        findFormByTitle: findFormByTitle,
        findFormById: findFormById
    };

    return api;

    function createFormForUser(userId, form) {
        userId = parseInt(userId);
        var _id = uuid.v1();
        if(form) {
            form._id = _id;
            form.userId = userId;
            formJSON.push(form);
        }
        return formJSON;
    }

    function findAllFormsForUser(userId) {
        userId = parseInt(userId);
        var userForms = [];
        for(var i in formJSON) {
            var form = formJSON[i];
            if(form.userId === userId) {
                userForms.push(form);
            }
        }

        return userForms;
    }

    function updateFormById(formId, updatedForm) {
        for(var i in formJSON) {
            var form = formJSON[i];
            if(form._id === formId) {
                formJSON[i] = updatedForm;
            }
        }
        return formJSON;
    }

    function deleteFormById(formId) {
        var removeIndex = -1;
        for(var i in formJSON) {
            var form = formJSON[i];
            if(form._id === formId) {
                removeIndex = i;
                break;
            }
        }

        if (removeIndex > -1) {
            formJSON.splice(removeIndex, 1);
        }

        return formJSON;
    }

    function findFormByTitle(title) {
        if(title) {
            for(var i in formJSON) {
                var form = formJSON[i];
                if(form.title === title) {
                    return form;
                }
            }

            return null;
        }
    }

    function findFormById(formId) {
        if(formId) {
            for(var i in formJSON) {
                var form = formJSON[i];
                if(form._id === formId) {
                    return form;
                }
            }
        }

        return null;
    }
};
