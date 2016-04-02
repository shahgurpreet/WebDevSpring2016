/**
 * Created by Gurpreet on 3/17/2016.
 */
module.exports = function (db, mongoose, formModel) {

    // load q promise library
    var q = require("q");

    // load field schema
    var FieldSchema = require("./field.schema.server.js")(mongoose);

    // create field model from schema
    var FieldModel = mongoose.model('field', FieldSchema);

    var FormModel = formModel.getMongooseModel();

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
        var deferred = q.defer();
        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                if(doc.fields != undefined) {
                    deferred.resolve(doc.fields);
                }
            }
        });
        return deferred.promise;
    }

    function getFieldForForm(formId, fieldId) {
        var deferred = q.defer();
        var ObjectId = mongoose.Types.ObjectId;
        fieldId = new ObjectId(fieldId);
        FormModel.findById(formId, function (err, doc) {
            if(err) {
                deferred.reject(err);
            }
            var field = doc.fields.id(fieldId);
            deferred.resolve(field);
        });

        return deferred.promise;
    }

    function deleteFieldFromForm(formId, fieldId) {
        var deferred = q.defer();
        var ObjectId = mongoose.Types.ObjectId;
        fieldId = new ObjectId(fieldId);
        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                return doc;
            }
        }).then(function(doc) {
            doc.fields.remove(fieldId);
            return doc.save();
        }).then(function(resp) {
            deferred.resolve(resp);
        });
        return deferred.promise;
    }

    function createFieldForForm(formId, field) {
        var newField = new FieldModel({
            label: field.label,
            type: field.type,
            placeholder: field.placeholder,
            options: field.options
        });

        var deferred = q.defer();

        var promise = FormModel.findById(formId);

        promise.then(function(response) {
            return response;
        }).then(function(doc) {
            var fields = doc.fields;
            fields.push(newField);
            doc.fields = fields;
            doc.save(function(err, resp) {
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(resp);
                }
            });
        });
        return deferred.promise;
    }

    function updateField(formId, fieldId, field) {
        var deferred = q.defer();

        var ObjectId = mongoose.Types.ObjectId;
        var newField = new FieldModel({
            label: field.label,
            type: field.type,
            placeholder: field.placeholder,
            options: field.options
        });

        FormModel.findOneAndUpdate(
            {_id: formId, 'fields._id': new ObjectId(fieldId)},
            {$set: {'fields.$': newField}},
            {new: true},
            function(err, doc) {
                if (!err) {
                    deferred.resolve(doc);
                }
                else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

    function createReplicaForm(formId, fieldId) {

        var deferred = q.defer();
        var ObjectId = mongoose.Types.ObjectId;
        fieldId = new ObjectId(fieldId);
        FormModel.findById(formId, function (err, doc) {
            var field = doc.fields.id(fieldId);
            var newField = {
                label: field.label,
                type: field.type,
                placeholder: field.placeholder,
                options: field.options
            };
            return createFieldForForm(formId, newField);
        }).then(function(response) {
            deferred.resolve(response);
        });

        return deferred.promise;
    }
};
