/**
 * Created by Gurpreet on 3/17/2016.
 */
module.exports = function (app) {

    var fs = require('fs');
    var uuid = require('node-uuid');
    var formJSON = JSON.parse(fs.readFileSync("./public/assignment/server/models/form.mock.json"));

    var api = {
        getFormFields: getFormFields,
        getFormField: getFormField,
        deleteFormField: deleteFormField,
        createFormField: createFormField,
        updateFormField: updateFormField
    };

    return api;

    function getFormFields(formId) {
        for(var i in formJSON) {
            var form = formJSON[i];
            if(form._id === formId) {
                return form.fields;
            }
        }

        return null;
    }

    function getFormField(formId, fieldId) {
        var fields = [];
        var fieldResp = {};
        for(var i in formJSON) {
            var form = formJSON[i];
            if(form._id === formId) {
                fields = form.fields;
                break;
            }
        }

        for(var j in fields) {
            var field = fields[j];
            if(field._id === fieldId) {
                fieldResp = field;
                break;
            }
        }
        return fieldResp;

    }

    function deleteFormField(formId, fieldId) {
        var fields = [];
        var removeFormIndex = -1;
        var removeFieldIndex = -1;
        for(var i in formJSON) {
            var form = formJSON[i];
            if(form._id === formId) {
                fields = form.fields;
                removeFormIndex = i;
                break;
            }
        }

        for(var j in fields) {
            var field = fields[j];
            if(field._id === fieldId) {
                removeFieldIndex = j;
                break;
            }
        }

        if (removeFieldIndex > -1) {
            fields.splice(removeFieldIndex, 1);
        }

        if(removeFormIndex > -1) {
            formJSON[removeFormIndex] = fields;
        }

        return formJSON;

    }

    function createFormField(formId, field) {
        if(field) {
            field._id = uuid.v1();
        }
        if(formId) {
            for(var i in formJSON) {
                var form = formJSON[i];
                if(form._id === formId) {
                    formJSON[i].fields.push(field);
                }
            }
        }

        return formJSON;
    }

    function updateFormField(formId, fieldId, field) {
        if(formId) {
            for(var i in formJSON) {
                var form = formJSON[i];
                if(form._id === formId) {
                    var fields = form.fields;
                    for(var j in fields) {
                        var field = fields[j];
                        if(field._id === fieldId) {
                            formJSON[i].fields[j] = field;
                        }
                    }
                }
            }

            return formJSON;
        }
    }
};
