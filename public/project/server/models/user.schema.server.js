/**
 * Created by Gurpreet on 4/1/2016.
 */
module.exports = function(mongoose) {

    var PlaceSchema = require("./place.schema.server.js")(mongoose);
    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        google:   {
            id:    String,
            token: String
        },
        facebook:   {
            id:    String,
            token: String
        },
        // place ids of places this user likes
        likes: [String],
        reviews: [String],
        // places this user likes
        likesPlaces: [PlaceSchema],
        // photos this user likes
        likesPhotos: [String],
        roles: [String],
        following: [String]
    }, {collection: 'wandermust_user'});

    return UserSchema;
};
