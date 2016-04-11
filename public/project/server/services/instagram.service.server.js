/**
 * Created by Gurpreet on 3/24/2016.
 */
module.exports = function(app) {

    var https = require('https');
    var insta_id = process.env.INSTAGRAM_KEY;
    var url = 'https://api.instagram.com/v1/locations/';
    var loc_url = 'https://api.instagram.com/v1/locations/search?';
    var photo_url = 'https://api.instagram.com/v1/tags/';

    app.get('/api/instagram/:tag/:token', getInstagramPhotos);


    function getInstagramPhotos(req, res) {
        var tag = req.params.tag;
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
