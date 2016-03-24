/**
 * Created by Gurpreet on 3/21/2016.
 */
module.exports = function (app) {

    var https = require('https');
    var Twitter = require('twitter-node-client').Twitter;
    app.get('/api/twitter/:tag', getTwitterPosts);

    function getTwitterPosts(req, res) {
        var tag = req.params.tag;
        console.log(tag);
        //Callback functions
        var error = function (err, response, body) {
            console.log('Error ' + err);
        };
        var success = function (data) {
            res.send(data);
        };

        var config = {
            "consumerKey": "8VlpyEzOzlSRpwXxKNqaQnEzN",
            "consumerSecret": "sirG58Jh5Lvr3vQIR3PRuBM0KvLJAmsCdGRtKGE54bHmYmwuTc",
            "accessToken": "138294064-vuF7hXX7yp4C9gGPy1VKNCycDwIhOBFJdvUz9sbh",
            "accessTokenSecret": "uIWu0gNwBKmC8KK6ptSJ2tcNi6jDQbexMHUgdLNIEiSSo",
            "callBackUrl": "http://webdev2016-shahgurpreet.rhcloud.com/"
        };

        var twitter = new Twitter(config);
        twitter.getSearch({'q':tag,'count': 20, 'include_entities': true, 'filter':'images'}, error, success);
    }
};