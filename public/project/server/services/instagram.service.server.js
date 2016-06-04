/**
 * Created by Gurpreet on 3/24/2016.
 */
module.exports = function(app) {

    var https = require('https');
    var slug = require('limax');

    var Flickr = require("flickrapi"),
        flickrOptions = {
            api_key: "623349722c4d246607fb689c500b3c7e",
            secret: "e4dc1d532cd61c14"
        };

    app.get('/api/instagram/:tag/:token', newf);



    function newf(req, res) {

        var tag = req.params.tag;
        tag = slug(tag);
        Flickr.tokenOnly(flickrOptions, function(error, flickr) {
            var token = req.params.token;
            if(token === '0') {
                token = '1';
            }
            if(error) {
                console.log(error);
            } else {
                flickr.photos.search({
                    text: tag,
                    page: token
                }, function(err, result) {
                    if(err) {
                        console.log(err);
                    } else {
                        res.send(result);
                    }
                });
            }
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
