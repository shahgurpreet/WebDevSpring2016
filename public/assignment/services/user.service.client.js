/**
 * Created by Gurpreet on 2/23/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return api;

        function findUserByCredentials(username, password, callback) {
            findAllUsers(getUsers);
            function getUsers(currentUsers) {
                for(var i in currentUsers) {
                    var user = currentUsers[i];
                    if(username === user.username && password == user.password) {
                        callback(user);
                        break;
                    }
                    callback(null);
                }
            }
        }

        function findAllUsers(callback) {
            var currentUsers = [
                {        "_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                    "username":"alice",  "password":"alice",   "roles": ["student"]                },
                {        "_id":234, "firstName":"Bob",              "lastName":"Hope",
                    "username":"bob",    "password":"bob",     "roles": ["admin"]                },
                {        "_id":345, "firstName":"Charlie",          "lastName":"Brown",
                    "username":"charlie","password":"charlie", "roles": ["faculty"]                },
                {        "_id":456, "firstName":"Dan",              "lastName":"Craig",
                    "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
                {        "_id":567, "firstName":"Edward",           "lastName":"Norton",
                    "username":"ed",     "password":"ed",      "roles": ["student"]                }
            ];
            callback(currentUsers);
        }

        function createUser(user, callback) {
            findAllUsers(getUsers);
            function findAllUsers(currentUsers) {
                user._id = new Date().getTime();
                currentUsers.push(user);
                callback(user);
            }
        }

        function deleteUserById(userId, callback) {
            findAllUsers(getUsers);
            function getUsers(currentUsers) {
                var removeIndex = -1;
                for(var i in currentUsers) {
                    var user = currentUsers[i];
                    if(user._id === userId) {
                        removeIndex = i;
                        break;
                    }
                }

                if (removeIndex > -1) {
                    currentUsers.splice(removeIndex, 1);
                }

                callback(currentUsers);
            }
        }

        function updateUser(userId, user, callback) {
            findAllUsers(getUsers);
            function getUsers(currentUsers) {
                for(var i in currentUsers) {
                    var current = currentUsers[i];
                    if(current._id === userId) {
                        currentUsers[i] = user;
                    }
                }
            }
        }
    }
})();
