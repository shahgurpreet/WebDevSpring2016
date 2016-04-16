/**
 * Created by Gurpreet on 3/21/2016.
 */
module.exports = function (app) {

    var https = require('https');
    var Twitter = require('twitter-node-client').Twitter;
    app.get('/api/twitter/:tag/:token', getTwitterPosts);
    var slug = require('limax');

    function getTwitterPosts(req, res) {
        var tag = req.params.tag;
        tag = slug(tag);
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
            "consumerKey": process.env.TWITTER_CONSUMER_KEY,
            "consumerSecret": process.env.TWITTER_CONSUMER_SECRET,
            "accessToken": process.env.TWITTER_ACCESS_TOKEN,
            "accessTokenSecret": process.env.TWITTER_ACCESS_TOKEN_SECRET,
            "callBackUrl": process.env.TWITTER_CALLBACK
        };

        var twitter = new Twitter(config);
        twitter.getCustomApiCall('/search/tweets.json?max_id='+token+'&q='+tag+'&include_entities=true&count=33&filter=images',{}, error, success);
    }
};