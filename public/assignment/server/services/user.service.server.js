/**
 * Created by Gurpreet on 3/15/2016.
 */

var passport         = '';
var LocalStrategy    = '';


module.exports = function(app, userModel) {

    var auth = authorized;
    app.get("/api/assignment/user", findAllUsers);
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", auth, updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);
    //app.post("/api/assignment/login", passport.authenticate('local'), login);
    app.post  ('/api/assignment/logout', logout);
    app.get   ('/api/assignment/loggedin', loggedin);

    // passport functionalities - start
    //passport.use(new LocalStrategy(localStrategy));
    //passport.serializeUser(serializeUser);
    //passport.deserializeUser(deserializeUser);


    // local strategy - first authenticate the user locally, then let passport js do the rest
    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    // this is used to create the cookie based on the user
    function serializeUser(user, done) {
        done(null, user);
    }

    // this is called to retrieve the user from the cookie
    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }
    // passport functionalities - end


    // login function - user already logged in the server, send it back to client
    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    /**
     * register a new user, first check if the username already exists in the database,
     if not. then create a new user*
     */
    function createUser(req, res) {
        var newUser = req.body.user;

        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                return userModel.findAllUsers();
                            }
                        });
                    }
                }
            ).then(
            function(users){
                res.json(users);
            }

        )
    }

    // this is called for user retrieval
    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }


    // function to get just one user if the request has a username,
    // otherwise return all users in the database
    function findAllUsers(req, res) {
        if(req.query.username) {
            findUserByUsername(req, res);
        } else {
            var users = userModel.findAllUsers().then(
                function (docs) {
                    res.json(docs);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
        }
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        userModel.findUserById(userId).then(
            // first retrieve the user by user id
            function (doc) {
                res.json(doc);
            },
            // reject promise if error
            function (err) {
                res.status(400).send(err);
            }
        )
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        userModel.findUserByUsername(username).then(
            function (doc) {
                res.json(doc);
            },
            // send error if promise rejected
            function (err) {
                res.status(400).send(err);
            }
        )
    }

    function findUserByCredentials(req, res) {
        var credentials = {
            username: req.query.username,
            password: req.query.password
        };
        var user = userModel.findUserByCredentials(credentials)
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function updateUser(req, res) {
        var userId = req.params.id;
        var newUser = req.body.user;

        if(!isAdmin(req.user)) {
            delete newUser.roles;
        }

        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

        userModel.updateUser(userId, newUser).then(
            function(doc) {
                return userModel.findAllUsers();
            },
            function(err) {
                res.status(400).send(err);
            }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req, res) {
        userModel
            .deleteUser(req.params.id)
            .then(
                function(user){
                    return userModel.findAllUsers();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );

    }

    // logout user by using passport's req.logOut
    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };


    function isAdmin(user) {
        if(user.roles) {
            if(user.roles.indexOf('admin') > -1) {
                return true;
            } else {
                return false;
            }
        }
    }
};
