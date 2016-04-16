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
        findUserByCredentials: findUserByCredentials,
        findUserByGoogleId: findUserByGoogleId,
        findUserByFacebookId: findUserByFacebookId,
        findUsersByUserIds: findUsersByUserIds,
        userLikesPlace: userLikesPlace,
        userCommentsOnPlace: userCommentsOnPlace,
        userLikesPhoto: userLikesPhoto
    };

    return api;

    // add place to user's comments
    function userCommentsOnPlace (userId, place) {

        var deferred = q.defer();

        // find the user
        UserModel.findById(userId, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {

                // add place id to user reviews
                doc.reviews.push (place.place_id);

                // save user
                doc.save (function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        // resolve promise with user
                        deferred.resolve (doc);
                    }
                });
            }
        });

        return deferred;
    }

    // add place to user likes
    function userLikesPlace (userId, place) {

        var deferred = q.defer();

        // find the user
        UserModel.findById(userId, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {

                // add place id to user likes
                doc.likes.push (place.place_id);

                // save user
                doc.save (function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        // resolve promise with user
                        deferred.resolve (doc);
                    }
                });
            }
        });

        return deferred;
    }


    function findUsersByUserIds (userIds) {
        var deferred = q.defer();
        // find all users in array of user names
        UserModel.find({
            _id: {$in: userIds}

        }, function (err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });

        return deferred.promise;
    }

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
    function updateUser(userId, updatedUser) {
        if(userId) {
            var deferred = q.defer();
            UserModel.findById(userId, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    return doc;
                }
            }).then(function(doc) {
                doc.username = updatedUser.username;
                doc.password = updatedUser.password;
                doc.firstName = updatedUser.firstName;
                doc.lastName = updatedUser.lastName;
                doc.email = updatedUser.email;
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

    function findUserByGoogleId(googleId) {
        return UserModel.findOne({'google.id': googleId});
    }

    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

    // add photo to user likes
    function userLikesPhoto (userId, photo) {

        var deferred = q.defer();

        // find the user
        UserModel.findById(userId, function (err, doc) {

            // reject promise if error
            if (err) {
                deferred.reject(err);
            } else {
                // add photo url to user likes
                doc.likesPhotos.push (photo.photo);

                // save user
                doc.save (function (err, doc) {

                    if (err) {
                        deferred.reject(err);
                    } else {

                        // resolve promise with user
                        deferred.resolve (doc);
                    }
                });
            }
        });

        return deferred;
    }
};
