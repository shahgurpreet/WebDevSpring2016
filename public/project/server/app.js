/**
 * Created by Gurpreet on 3/8/2016.
 */
module.exports = function(app, db, mongoose) {
    require("./services/google.service.server.js")(app);
    require("./services/twitter.service.server.js")(app);
    require("./services/similarity.service.server.js")(app);
    require("./services/instagram.service.server.js")(app);
    require("./services/wikipedia.service.server.js")(app);

    // pass db and mongoose reference to model
    var userModel = require("./models/user.model.server.js")(db, mongoose);
    var placeModel = require("./models/place.model.server.js")(db, mongoose);
    var photoModel = require("./models/photo.model.server.js")(db, mongoose);
    require("./services/user.service.server.js") (app, userModel, placeModel, photoModel);
    require("./services/place.service.server.js") (app, placeModel, userModel);
    require("./services/photo.service.server.js") (app, photoModel, userModel);
};
