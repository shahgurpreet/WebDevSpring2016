/**
 * Created by Gurpreet on 3/24/2016.
 */
module.exports = function(app) {

    var https = require('https');
    var insta_id = '523871488.1677ed0.9bffbc141261470493c0ad2e655d92ce';
    var url = 'https://api.instagram.com/v1/locations/';
    var loc_url = 'https://api.instagram.com/v1/locations/search?';
    var photo_url = 'https://api.instagram.com/v1/tags/';

    app.get('/api/instagram/:tag', getInstagramPhotos);

    function getInstagramPhotos(req, res) {
        var tag = req.params.tag;
        var endpoint = photo_url + tag + "/" + 'media/recent?access_token=' + insta_id;
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
