/**
 * Created by Gurpreet on 3/15/2016.
 */
module.exports = function(db, mongoose) {

    var uuid = require('node-uuid');

    // load q promise library
    var q = require("q");

    // load form schema
    var FormSchema = require("./form.schema.server.js")(mongoose);

    // create form model from schema
    var FormModel = mongoose.model('form', FormSchema);

    var formJSON = '';

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
        if(form) {
            form.userId = userId;
            form.fields = [];
            // use q to defer the response
            var deferred = q.defer();

            // insert new form with mongoose form model's create()
            FormModel.create(form, function (err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

            // return a promise
            return deferred.promise;
        }
    }

    function findAllFormsForUser(userId) {
        var deferred = q.defer();

        // insert new form with mongoose form model's create()
        FormModel.find({userId: userId}, function (err, docs) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(docs);
            }

        });

        // return a promise
        return deferred.promise;
    }

    function updateFormById(formId, updatedForm) {
        if(formId) {
            var deferred = q.defer();
            FormModel.findById(formId, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    return doc;
                }
            }).then(function(doc) {
                doc.title = updatedForm.title;
                doc.fields = updatedForm.fields;
                doc.save(function(err, resp) {
                    if(err) {
                        console.log(err);
                        deferred.reject(err);
                    } else {
                        deferred.resolve(resp);
                    }
                });
            });

            return deferred.promise;
        }
    }

    function deleteFormById(formId) {
        if(formId) {
            var deferred = q.defer();
            FormModel.remove({_id: formId}, function (err, resp) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(resp);
                }
            });

            return deferred.promise;
        }
    }

    function findFormByTitle(title) {
        if(title) {
            var deferred = q.defer();

            // find one retrieves one document
            FormModel.findOne(

                // first argument is predicate
                { title: title},

                // doc is unique instance matches predicate
                function(err, doc) {

                    if (err) {
                        // reject promise if error
                        deferred.reject(err);
                    } else {
                        // resolve promise
                        deferred.resolve(doc);
                    }

                });

            return deferred.promise;
        }
    }

    function findFormById(formId) {
        if(formId) {
            var deferred = q.defer();
            FormModel.findById(formId, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
            return deferred.promise;
        }
    }

};
