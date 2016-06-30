/**
 * Created by Gurpreet on 3/24/2016.
 */
module.exports = function(app) {

    var https = require('https');
    var slug = require('limax');

    var Flickr = require("node-flickr");
    var keys = {
        api_key: "623349722c4d246607fb689c500b3c7e",
        secret: "e4dc1d532cd61c14"
    };

    var flickr = new Flickr(keys);

    app.get('/api/instagram/:tag/:token', fetchFlickrPhotos);



    function fetchFlickrPhotos(req, res) {

        var tag = req.params.tag;
        tag = slug(tag);
        var token = req.params.token;
        if(token === '0') {
            token = '1';
        }

        flickr.get("photos.search", {"tags":tag, page: token}, function(err, result) {
            if (err) return console.error(err);
            res.send(result);
        });

    }


    function getInstagramPhotos(req, res) {
        var tag = req.params.tag;
        tag = slug(tag);
        var token = req.params.token;
        if(token === '0') {
            token = '';
        }
        var endpoint = photo_url + tag + "/" + 'media/recent?access_token=' + insta_id + '&max_tag_id=' + token +
            '&count=50';
        https.get(endpoint, function(response) {
            var finalData = '';
            response.on('data', function(chunk) {
                finalData += chunk;
            });
            response.on('end', function() {
                var photos = JSON.parse(finalData);
                res.send(photos);
            });
        });
    }
};
