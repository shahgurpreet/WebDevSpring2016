/**
 * Created by Gurpreet on 4/11/2016.
 */
var q = require("q");

// pass db and mongoose reference to model
module.exports = function(db, mongoose) {

    // load movie schema from movie model
    var PlaceSchema = require("./place.schema.server.js")(mongoose);

    // create movie from schema
    var Place  = mongoose.model("Place", PlaceSchema);

    var places = [];
    var api = {
        findPlaceById: findPlaceById,
        findPlacesByIds: findPlacesByIds,
        createPlace: createPlace,
        userLikesPlace: userLikesPlace,
        userCommentsOnPlace: userCommentsOnPlace
    };
    return api;

    function userCommentsOnPlace(userId, place){
        var deferred = q.defer();

        // find the place by place id
        Place.findOne({place_id: place.place_id},

            function (err, doc) {

                // reject promise if error
                if (err) {
                    deferred.reject(err);
                }

                // if there's a place
                if (doc) {
                    // add new comment to reviews
                    doc.reviews = place.reviews;
                    // save changes
                    doc.save(function(err, doc){
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                } else {
                    // if there's no place
                    // create a new instance
                    place = new Place({
                        place_id: place.place_id,
                        name: place.name,
                        thumb: place.thumb,
                        vicinity: place.vicinity,
                        lat: place.lat,
                        long: place.long,
                        likes: [],
                        reviews: place.reviews,
                    });
                    place.userReviews.push(userId);
                    // save new instance
                    place.save(function(err, doc) {
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

    function userLikesPlace (username, place) {
        var deferred = q.defer();

        // find the place by place_id
        Place.findOne({place_id: place.place_id},

            function (err, doc) {

                // reject promise if error
                if (err) {
                    deferred.reject(err);
                }

                // if there's a place
                if (doc) {
                    // add user to likes
                    doc.likes.push (username);
                    // save changes
                    doc.save(function(err, doc){
                        if (err) {
                            deferred.reject(err);
                        } else {
                            deferred.resolve(doc);
                        }
                    });
                } else {
                    // if there's no place
                    // create a new instance
                    place = new Place({
                        place_id: place.place_id,
                        name: place.name,
                        thumb: place.thumb,
                        vicinity: place.vicinity,
                        lat: place.lat,
                        long: place.long,
                        likes: [],
                        reviews: place.reviews
                    });
                    // add user to likes
                    place.likes.push (username);
                    // save new instance
                    place.save(function(err, doc) {
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

    function findPlacesByIds (place_ids) {

        var deferred = q.defer();

        // find all places
        // whose places IDs
        // are in place ids array
        Place.find({
            place_id: {$in: place_ids}
        }, function (err, places) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(places);
            }
        });
        return deferred.promise;
    }

    function createPlace(movie) {

        // create instance of place
        var place = new Place({
            place_id: place.place_id,
            name: place.name,
            thumb: place.thumb,
            vicinity: place.vicinity,
            lat: place.lat,
            long: place.long,
            likes: [],
            reviews: place.reviews
        });
        var deferred = q.defer();

        // save place to database
        place.save(function (err, doc) {

            if (err) {
                // reject promise if error
                defferred.reject(err)
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        return deferred.promise;
    }

    function findPlaceById(place_id) {

        var deferred = q.defer();

        Place.findOne({place_id: place_id}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }
}
