/**
 * Created by Gurpreet on 4/11/2016.
 */
module.exports = function(app, placeModel, userModel) {
    app.post("/api/project/user/:userId/place/:place_id", userLikesPlace);
    app.get("/api/project/place/:place_id/user", findUserLikes);
    app.post("/api/project/user/:userId/comment/place/:place_id", userCommentsOnPlace);
    app.get("/api/project/place/details/:place_id", findPlaceById);
    app.post("/api/project/place/admin/review/", adminDeletesReview);

    function adminDeletesReview(req, res) {
        var place = req.body;

        placeModel
            .adminDeletesReview(place)
            .then (
                function (doc) {
                   res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function userCommentsOnPlace(req, res) {
        var place = req.body;
        var userId = req.params.userId;

        placeModel
            .userCommentsOnPlace(userId, place)
            .then (
                function(place) {
                    return userModel.userCommentsOnPlace(userId, place);
                },
                function(err) {
                    res.status(400).send(err);
                })
            .then (
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
    }

    function findUserLikes (req, res) {
        var place_id = req.params.place_id;

        var place = null;
        placeModel
            .findPlaceById(place_id)
            .then (
                function (doc) {
                    place = doc;
                    if (doc) {
                        return userModel.findUsersByUserIds(place.likes);
                    } else {
                        res.json ({});
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then (
                function (users) {
                    place.userLikes = users;
                    res.json(place);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function userLikesPlace(req, res) {
        var place  = req.body;
        var userId = req.params.userId;
        placeModel
            .userLikesPlace(userId, place)
            // add user to place likes
            .then(
                function (place) {
                    return userModel.userLikesPlace(userId, place);
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            // add place to user likes
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findPlaceById (req, res) {
        var place_id = req.params.place_id;
        placeModel.findPlaceById(place_id)
            // handle model promise
            .then(
                function (doc) {
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );

    }
};