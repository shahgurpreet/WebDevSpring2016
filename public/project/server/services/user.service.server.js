/**
 * Created by Gurpreet on 3/15/2016.
 */

var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;


module.exports = function(app, userModel, placeModel, photoModel) {

    var auth = authorized;
    app.get("/api/project/user", findAllUsers);
    app.post("/api/project/user", createUser);
    app.get("/api/project/user/:id", findUserById);
    app.put("/api/project/user/:id", auth, updateUser);
    app.delete("/api/project/user/:id", deleteUser);
    app.post("/api/project/login", passport.authenticate('local'), login);
    app.post  ('/api/project/logout', logout);
    app.get   ('/api/project/loggedin', loggedin);
    app.get("/api/project/liked/:userId", getLikedPlaces);
    app.get("/api/project/reviewed/:userId", getReviewedPlaces);
    app.post("/api/project/userid/username", getUsernamesByIds);
    app.get("/api/project/liked/photos/:userId", getLikedPhotos);


    // passport functionalities - start
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    // configuring google callback, client id and secret
    var googleConfig = {
        clientID        : process.env.GOOGLE_CLIENT_ID,
        clientSecret    : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL     : process.env.GOOGLE_CALLBACK
    };
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    // configuring web service endpoint to respond to the google button click
    app.get   ('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get   ('/project/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/project/client/index.html#/home',
            failureRedirect: '/project/client/index.html#/login'
        }));


    // configuring web service endpoint to respond to the facebook button click
    app.get   ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/project/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/client/index.html#/home',
            failureRedirect: '/project/client/index.html#/login'
        }));

    // configuring facebook callback, client id and secret
    var facebookConfig = {
        clientID        : process.env.FACEBOOK_CLIENT_ID,
        clientSecret    : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL     : process.env.FACEBOOK_CALLBACK
    };
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    function facebookStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var names = profile.displayName.split(" ");
                        var newFacebookUser = {
                            lastName:  names[1],
                            firstName: names[0],
                            email:     profile.emails ? profile.emails[0].value:"",
                            facebook: {
                                id:    profile.id,
                                token: token
                            },
                            username: names[0]
                        };
                        return userModel.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }


    // google strategy to login the user after response comes back from  google
    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var newGoogleUser = {
                            lastName: profile.name.familyName,
                            firstName: profile.name.givenName,
                            email: profile.emails[0].value,
                            google: {
                                id:          profile.id,
                                token:       token
                            },
                            username: profile.name.givenName
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }


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
            newUser.roles = ["visitor"];
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


    // umbrella function to get just one user if the request has a username,
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
        if(isAdmin(req.user)) {

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
        } else {
            res.status(403);
        }
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

    function getLikedPlaces(req, res) {
        var userId = req.params.userId;
        var user = null;

        // use model to find user by user id
        userModel.findUserById(userId)
            .then(

                // first retrieve the user by user name
                function (doc) {

                    user = doc;

                    // fetch places this user likes
                    return placeModel.findPlacesByIds(doc.likes);
                },

                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                // fetch places this user likes
                function (places) {

                    // list of places this user likes
                    // places are not stored in database
                    // only added for UI rendering
                    user.likesPlaces = places;
                    res.json(user);
                },

                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function getReviewedPlaces(req, res) {
        var userId = req.params.userId;
        var user = null;

        // use model to find user by user id
        userModel.findUserById(userId)
            .then(

                // first retrieve the user by user name
                function (doc) {

                    user = doc;

                    // fetch places this user likes
                    return placeModel.findPlacesByIds(doc.reviews);
                },

                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                // fetch places this user likes
                function (places) {

                    // list of places this user likes
                    // places are not stored in database
                    // only added for UI rendering
                    res.json(places);
                },

                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function getUsernamesByIds(req, res) {
        var userIds = req.body.userIds;
        var usernames = [];
        userModel.findUsersByUserIds(userIds)
            .then(
                function(users) {
                    for(var i in users) {
                        var user = users[i];
                        usernames.push({
                            username: user.username,
                            userId: user._id}
                        );
                    }
                    res.send(usernames);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function getLikedPhotos(req, res) {
        var userId = req.params.userId;
        var user = null;

        // use model to find user by user id
        userModel.findUserById(userId)
            .then(

                // first retrieve the user by user name
                function (doc) {

                    user = doc;

                    // fetch photos this user likes
                    return photoModel.findPhotosByUrls(doc.likesPhotos);
                },

                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                // fetch photos this user likes
                function (photos) {

                    // list of places this user likes
                    // places are not stored in database
                    // only added for UI rendering
                    res.json(photos);
                },

                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            )
    }

    function isAdmin(user) {
        if(user.roles.indexOf('Admin') > -1) {
            return true;
        } else {
            return false;
        }
    }
};
