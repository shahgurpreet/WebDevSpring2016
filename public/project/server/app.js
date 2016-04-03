/**
 * Created by Gurpreet on 3/8/2016.
 */
module.exports = function(app) {
    require("./services/google.service.server.js")(app);
    require("./services/twitter.service.server.js")(app);
    require("./services/similarity.service.server.js")(app);
    require("./services/instagram.service.server.js")(app);
    require("./services/wikipedia.service.server.js")(app);
    require("./services/user.service.server.js")(app);
};
