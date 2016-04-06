/**
 * Created by Gurpreet on 3/21/2016.
 */
module.exports = function (app) {

    var https = require('https');
    var Twitter = require('twitter-node-client').Twitter;
    app.get('/api/twitter/:tag/:token', getTwitterPosts);

    function getTwitterPosts(req, res) {
        var tag = req.params.tag;
        tag = tag + ' -RT';
        var token = req.params.token;
        if(token === '0') {
            token = '';
        }
        //Callback functions
        var error = function (err, response, body) {
            console.log('Error ' + JSON.stringify(err));
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
        twitter.getCustomApiCall('/search/tweets.json?max_id='+token+'&q='+tag+'&include_entities=true&count=33&filter=images',{}, error, success);
    }
};