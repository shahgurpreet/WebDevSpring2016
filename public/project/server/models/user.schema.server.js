/**
 * Created by Gurpreet on 4/1/2016.
 */
module.exports = function(mongoose) {

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
    }, {collection: 'wandermust_user'});

    return UserSchema;
};
