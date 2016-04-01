/**
 * Created by Gurpreet on 4/1/2016.
 */
module.exports = function(mongoose) {

    var fieldSchema = require('./field.schema.server.js')(mongoose);

    // use mongoose to declare a form schema
    var FormSchema = mongoose.Schema({
        userId: String,
        title: {
            type: String,
            default: 'New Form'
        },
        fields: [fieldSchema],
        created: {
            type: Date,
            default: new Date()
        },
        updated: {
            type: Date,
            default: new Date()
        }
    }, {collection: 'form'});

    return FormSchema;
};