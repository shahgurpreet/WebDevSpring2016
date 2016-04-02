/**
 * Created by Gurpreet on 3/15/2016.
 */
module.exports = function(app, db, mongoose) {
    // pass db and mongoose reference to model
    var userModel = require("./models/user.model.server.js")(db, mongoose);
    var formModel = require("./models/form.model.server.js")(db, mongoose);
    var fieldsModel = require("./models/fields.model.server.js")(db, mongoose, formModel);

    var userService  = require("./services/user.service.server.js") (app, userModel);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var fieldService = require("./services/field.service.server.js")(app, fieldsModel);
};