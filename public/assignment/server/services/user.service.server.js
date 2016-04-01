/**
 * Created by Gurpreet on 3/15/2016.
 */
module.exports = function(app, userModel) {

    app.get("/api/assignment/user", findAllUsers);
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    function createUser(req, res) {
        var user = req.body.user;
        user = userModel.createUser(user)
            // handle model promise
            .then(
                // login user if promise resolved
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllUsers(req, res) {
        if(req.query.password && req.query.username) {
            findUserByCredentials(req, res);
        } else if(req.query.username) {
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
        var user = req.body.user;
        userModel.updateUser(userId, user).then(
            function(doc) {
                res.json(doc);
            },
            function(err) {
                res.status(400).send(err);
            }
        )
    }

    function deleteUser(req, res) {
        var userid = req.params.id;
        userModel.deleteUser(userid).then(
            function(docs) {
                res.json(docs);
            },
            function(err) {
                res.status(400).send(err);
            }
        )
    }
};
