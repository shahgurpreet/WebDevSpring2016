/**
 * Created by Gurpreet on 3/15/2016.
 */
module.exports = function(app) {
    var userModel = require("./../models/user.model.js")();

    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user?username=username", findUserByUsername);
    app.get("/api/assignment/user?username=alice&password=wonderland", findUserByCredentials);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);


    function createUser(req, res) {
        var user = req.body;
        var users = userModel.createUser(user);
        res.send(users);
    }

    function findAllUsers(req, res) {
        res.send(userModel.findAllUsers());
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        var user = userModel.findUserById(userId);
        res.send(user);
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        var user = userModel.findUserByUsername(username);
        res.send(user);
    }

    function findUserByCredentials(req, res) {
        var credentials = {
            username: req.query.username,
            password: req.query.password
        }
        var user = userModel.findUserByCredentials(credentials);
        res.send(user);
    }

    function updateUser(req, res) {
        var userId = req.params.id;
        var user = req.body;

        var users = userModel.updateUser(userId, user);
        res.send(users);
    }

    function deleteUser(req, res) {
        var userid = req.params.id;
        var users = userModel.deleteUser(userid);
        res.send(users);
    }
};
