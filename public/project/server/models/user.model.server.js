/**
 * Created by Gurpreet on 3/15/2016.
 */
module.exports = function(db, mongoose) {

    var uuid = require('node-uuid');

    // load q promise library
    var q = require("q");

    // load user schema
    var UserSchema = require("./user.schema.server.js")(mongoose);

    // create user model from schema
    var UserModel = mongoose.model('wandermust_user', UserSchema);

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById:findUserById,
        updateUser:updateUser,
        deleteUser:deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };

    return api;

    function createUser(user) {
        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        UserModel.create(user, function (err, doc) {

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

    function findAllUsers() {
        var deferred = q.defer();

        // find without first argument retrieves all documents
        UserModel.find({}, function(err, docs) {
            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(docs);
            }

        });

        return deferred.promise;
    }

    function findUserById(userId) {
        if(userId) {
            var deferred = q.defer();
            UserModel.findById(userId, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
            return deferred.promise;
        }
    }

    // update the user in the database based on the user id
    function updateUser(userId, user) {
        // The $set operator replaces the value of a field with the specified value
        return UserModel.update({_id: userId}, {$set: user});
    }

    function deleteUser(userId) {
        if(userId) {
            var deferred = q.defer();
            UserModel.remove({_id: userId}, function (err, resp) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(resp);
                }
            });

            return deferred.promise;
        }
    }

    function findUserByUsername(username) {
        if(username) {
            var deferred = q.defer();

            // find one retrieves one document
            UserModel.findOne(

                // first argument is predicate
                { username: username},

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

    function findUserByCredentials(credentials) {
        var deferred = q.defer();

        // find one retrieves one document
        UserModel.findOne(

            // first argument is predicate
            { username: credentials.username,
                password: credentials.password },

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
};
