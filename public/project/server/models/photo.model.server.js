/**
 * Created by Gurpreet on 4/14/2016.
 */

var q = require("q");

// pass db and mongoose reference to model
module.exports = function(db, mongoose) {

    // load photo schema from movie model
    var PhotoSchema = require("./photo.schema.server.js")(mongoose);

    // create movie from schema
    var Photo  = mongoose.model("Photo", PhotoSchema);

    var api = {
        userLikesPhoto: userLikesPhoto,
        findPhotosByUrls: findPhotosByUrls
    };
    return api;

    function findPhotosByUrls(urls) {
        var deferred = q.defer();

        // find all photos
        // whose photo field
        // is in urls array
        Photo.find({
            photo: {$in: urls}
        }, function (err, photos) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(photos);
            }
        });
        return deferred.promise;
    }


    function userLikesPhoto (userId, photo) {
        var deferred = q.defer();

        // find the photo by url
        Photo.findOne({photo: photo.photo},

            function (err, doc) {

                // reject promise if error
                if (err) {
                    deferred.reject(err);
                }

                // if there's a photo
                if (doc) {
                    // add user to likes
                    photo.userLikes.push (userId);
                    // save changes
                    doc.save(function(err, doc){
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                } else {
                    // if there's no photo
                    // create a new instance
                    photo = new Photo({
                        photo: photo.photo,
                        tags: photo.tags,
                        userLikes: []
                    });
                    // add user to likes
                    photo.userLikes.push (userId);
                    // save new instance
                    photo.save(function(err, doc) {
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                }
            });

        return deferred.promise;
    }
};
