/**
 * Created by Gurpreet on 4/14/2016.
 */
module.exports = function(app, photoModel, userModel) {
    app.post("/api/project/photo/:userId", userLikesPhoto);

    function userLikesPhoto(req, res) {
        var photo = req.body;
        var userId = req.params.userId;
        photoModel
            .userLikesPhoto(userId, photo)
            .then (
                function(photo) {
                    return userModel.userLikesPhoto(userId, photo);
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
};