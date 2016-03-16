/**
 * Created by Gurpreet on 3/15/2016.
 */
module.exports = function(app) {

    var fs = require('fs');
    var formJSON = JSON.parse(fs.readFileSync('./form.mock.json'));

    var api = {
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        updateFormById:updateFormById,
        deleteFormById:deleteFormById,
        findFormByTitle: findFormByTitle
    };

    return api;

    function createFormForUser(userId, form) {
        var _id = new Date().getTime();
        if(form) {
            form._id = _id;
            form.userId = userId;
            formJSON.push(form);
        }
        return formJSON;
    }

    function findAllFormsForUser(userId) {
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
};
