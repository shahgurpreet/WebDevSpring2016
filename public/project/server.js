/**
 * Created by Gurpreet on 3/8/2016.
 */
module.exports = function(app) {

    var https = require('https');
    var htmlparser = require("htmlparser2");

    app.get('/api/hello/:city', sayHello);
    app.get('/api/hello1/:photo', sayHello1);

    function sayHello(req, res) {
        var city = req.params.city;
        var api_key = 'AIzaSyD8M-KBuFrLLvqhQ5eMTpOMXhamomRfwZ4';
        var endpoint = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=500&location=';
        var lat_long_url = 'https://maps.google.com/maps/api/geocode/json?address=';

        lat_long_url += city;
        var lat_long_promise = https.get(lat_long_url);

        https.get(lat_long_url, function(response) {
            var data = '';
            response.on('data', function(chunk) {
                data += chunk;
            });

            response.on('end', function() {
                var lat_long_raw = JSON.parse(data);
                var lat_long_json = lat_long_raw.results[0].geometry.location;
                endpoint = endpoint + lat_long_json.lat + ',' + lat_long_json.lng;
                endpoint = endpoint + '&key=' + api_key;

                https.get(endpoint, function(response) {
                    var finalData = '';
                    response.on('data', function(chunk) {
                        finalData += chunk;
                    });
                    response.on('end', function() {
                        var places = JSON.parse(finalData);
                        res.send(places);
                    });
                });

            });
        });



    }

    function sayHello1(req, res) {
        var api_key = 'AIzaSyD8M-KBuFrLLvqhQ5eMTpOMXhamomRfwZ4';
        var endpoint = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=500&photoreference=';
        var photo_reference = req.params.photo;
        endpoint += photo_reference;
        endpoint = endpoint + '&key=' + api_key;
        https.get(endpoint, function(response) {
            var finalData = '';
            var photo_url = '';
            response.on('data', function(chunk) {
                finalData += chunk;
            });
            response.on('end', function() {
                var parser = new htmlparser.Parser({
                    onopentag: function(name, attribs){
                        if(name === "a") {
                            photo_url = attribs.href;
                        }
                    },
                    ontext: function(text){

                    },
                    onclosetag: function(tagname){

                    }
                }, {decodeEntities: true});
                parser.write(finalData);
                parser.end();
                res.send(photo_url);
            });
        });
    }
};
