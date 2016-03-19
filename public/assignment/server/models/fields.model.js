/**
 * Created by Gurpreet on 3/17/2016.
 */
module.exports = function (app) {

    var uuid = require('node-uuid');
    var mock = require("./form.mock.json");

    var api = {
        getFieldsForForm: getFieldsForForm,
        getFieldForForm: getFieldForForm,
        deleteFieldFromForm: deleteFieldFromForm,
        createFieldForForm: createFieldForForm,
        updateField: updateField,
        createReplicaForm: createReplicaForm
    };

    return api;

    function getFieldsForForm(formId) {
        for(var i in mock) {
            var form = mock[i];
            if(form._id === formId) {
                return form.fields;
            }
        }

        return null;
    }

    function getFieldForForm(formId, fieldId) {
        var fields = [];
        var fieldResp = {};
        for(var i in mock) {
            var form = mock[i];
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
        for(var i in mock) {
            var form = mock[i];
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
            var fields = mock[removeFormIndex].fields;
            fields.splice(removeFieldIndex, 1);
            mock[removeFormIndex].fields = fields;
        }

        return mock;

    }

    function createFieldForForm(formId, field) {
        if(field) {
            field._id = uuid.v1();
        }
        if(formId) {
            for(var i in mock) {
                var form = mock[i];
                if(form._id === formId) {
                    mock[i].fields.push(field);
                }
            }
        }
        return mock;
    }

    function updateField(formId, fieldId, newField) {
        if(formId) {
            for(var i in mock) {
                var form = mock[i];
                if(form._id === formId) {
                    var fields = form.fields;
                    for(var j in fields) {
                        var field = fields[j];
                        if(field._id === fieldId) {
                            mock[i].fields[j] = newField;
                        }
                    }
                }
            }
            return mock;
        }
    }

    function createReplicaForm(formId, fieldId) {
        var newField = {};
        if(formId) {
            for(var i in mock) {
                var form = mock[i];
                if(form._id === formId) {
                    var fields = form.fields;
                    for(var j in fields) {
                        var field = fields[j];
                        if(field._id === fieldId) {
                            newField = field;
                            newField._id = uuid.v1();
                            mock[i].fields.push(newField);
                        }
                    }

                }
            }
        }
        return mock;
    }
};
