/**
 * Created by Gurpreet on 3/15/2016.
 */
module.exports = function(app) {

    var fs = require('fs');
    var userJSON = JSON.parse(fs.readFileSync('./user.mock.json'));

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById:findUserById,
        updateUser:updateUser,
        deleteUser:deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };

    return api;

    function createUser(user) {
        if(user) {
            userJSON.push(user);
        }

        return userJSON;
    }

    function findAllUsers() {
        return userJSON;
    }

    function findUserById(userId) {
        if(userId) {
            userId = parseInt(userId);
            for(var i in userJSON) {
                var user = userJSON[i];
                if(user._id === userId) {
                    return user;
                }
            }

            return null;
        }
    }

    function updateUser(userId, updatedUser) {
        if(userId) {
            userId = parseInt(userId);
            for(var i in userJSON) {
                var user = userJSON[i];
                if(user._id === userId) {
                    userJSON[i] = updatedUser;
                }
            }
        }

        return userJSON;
    }

    function deleteUser(userId) {
        if(userId) {
            userId = parseInt(userId);
            var removeIndex = -1;
            for(var i in userJSON) {
                var user = userJSON[i];
                if(user._id === userId) {
                    removeIndex = i;
                    break;
                }
            }

            if (removeIndex > -1) {
                userJSON.splice(removeIndex, 1);
            }

            return userJSON;
        }
    }

    function findUserByUsername(username) {
        if(username) {
            for(var i in userJSON) {
                var user = userJSON[i];
                if(user.username === username) {
                    return user;
                }
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        for(var i in userJSON) {
            var user = userJSON[i];
            if(credentials.username === user.username && credentials.password == user.password) {
                return user;
            }
        }

        return null;
    }
};
