/**
 * Created by Gurpreet on 3/15/2016.
 */
module.exports = function(app) {
    require("./services/user.service.server.js")(app);
    require("./services/form.service.server.js")(app);
    require("./services/field.service.server.js")(app);
};