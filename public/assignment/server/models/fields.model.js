/**
 * Created by Gurpreet on 3/17/2016.
 */
module.exports = function (app) {

    var fs = require('fs');
    var uuid = require('node-uuid');
    var formJSON = JSON.parse(fs.readFileSync("./public/assignment/server/models/form.mock.json"));

    var api = {
        getFieldsForForm: getFieldsForForm,
        getFieldForForm: getFieldForForm,
        deleteFieldFromForm: deleteFieldFromForm,
        createFieldForForm: createFieldForForm,
        updateField: updateField
    };

    return api;

    function getFieldsForForm(formId) {
        for(var i in formJSON) {
            var form = formJSON[i];
            if(form._id === formId) {
                return form.fields;
            }
        }

        return null;
    }

    function getFieldForForm(formId, fieldId) {
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

    function deleteFieldFromForm(formId, fieldId) {
        var removeFieldIndex = -1;
        var removeFormIndex = -1;
        for(var i in formJSON) {
            var form = formJSON[i];
            if(form._id === formId) {
                removeFormIndex = i;
                var fields = form.fields;
                for(var j in fields) {
                    var field = fields[j];
                    if(field._id === fieldId) {
                        removeFieldIndex = j;
                        break;
                    }
                }
            }
        }

        if(removeFormIndex > -1) {
            var fields = formJSON[removeFormIndex].fields;
            fields.splice(removeFieldIndex, 1);
            formJSON[removeFormIndex].fields = fields;
        }

        return formJSON;

    }

    function createFieldForForm(formId, field) {
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

    function updateField(formId, fieldId, field) {
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
