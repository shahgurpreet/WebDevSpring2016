/**
 * Created by Gurpreet on 4/11/2016.
 */
module.exports = function(mongoose) {

    // use mongoose to declare a place schema
    var PlaceSchema = mongoose.Schema({
        place_id: String,
        name: String,
        vicinity: String,
        lat: String,
        long: String,
        thumb: String,
        // ids of users that like this movie
        likes: [String],
        reviews: [String],
        // list of users that like this movie
        userLikes: [
            {userId: String}
        ],
        // list of users that reviewed this place
        userReviews: [
            {userId: String}
        ]
        // store place documents in this collection
    }, {collection: 'wandermust_place'});

    return PlaceSchema;

};
