/**
 * Created by Gurpreet on 4/14/2016.
 */
module.exports = function(mongoose) {

    // use mongoose to declare a photo schema
    var PhotoSchema = mongoose.Schema({
        photo: String,
        tags: String,
        userLikes: [String]
    }, {collection: 'wandermust_photo'});

    return PhotoSchema;
};
