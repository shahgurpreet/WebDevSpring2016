/**
 * Created by Gurpreet on 3/15/2016.
 */
module.exports = function(app, db, mongoose) {

    // pass db and mongoose reference to model
    var userModel = require("./models/user.model.server.js")(db, mongoose);
    var formModel = require("./models/form.model.server.js")(db, mongoose);
    var fieldModel = require("./models/form.model.server.js")(db, mongoose);

    var userService  = require("./services/user.service.server.js") (app, userModel);
    var formService = require("./services/form.service.server.js")(app, formModel, fieldModel, userModel);
    var fieldService = require("./services/field.service.server.js")(app, fieldModel);

};