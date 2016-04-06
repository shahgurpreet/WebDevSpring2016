/**
 * Created by Gurpreet on 3/21/2016.
 */
module.exports = function(app) {
    var https = require('https');
    var htmlparser = require("htmlparser2");
    var slug = require('limax');
    var api_key = 'AIzaSyD8M-KBuFrLLvqhQ5eMTpOMXhamomRfwZ4';

    app.get('/api/poi/:city/:token', getPOIForCity);
    app.get('/api/poi/:lat/:long/:token', getPOIForHome);
    app.get('/api/place/:place_id', getPlaceDetails);
    app.get('/api/photoPOI/:photo/:name', getPhotoPOI);

    function getPOIForHome(req, res) {
        var lat = req.params.lat;
        var long = req.params.long;
        var token = req.params.token;
        if(token === '0') {
            token = '';
        }
        var endpoint = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=20000&' + '' +
            '&keyword=touristattraction&type=place_of_interest&location=';
        endpoint = endpoint + lat + ',' + long;
        endpoint = endpoint + '&key=' + api_key + '&pagetoken=' + token;
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

    }

    function getPOIForCity(req, res) {
        var city = req.params.city;
        city = slug(city);
        var token = req.params.token;
        if(token === '0') {
            token = '';
        }
        var endpoint = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=30000' +
            '&keyword=touristattraction&type=place_of_interest&location=';
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
                endpoint = endpoint + '&key=' + api_key + '&pagetoken=' + token;

                https.get(endpoint, function(response) {
                    var finalData = '';
                    response.on('data', function(chunk) {
                        finalData += chunk;
                    });
                    response.on('end', function() {
                        var places = JSON.parse(finalData);
                        res.send(places);
                    });
                    response.on('error', function(err) {
                        console.log(err);
                    })
                });

            });
        });
    }

    function getPhotoPOI(req, res) {
        var photo_reference = req.params.photo;
        var place_name = req.params.name;
        var endpoint = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=500&photoreference=';
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
                var place_photo = {
                    name: place_name,
                    photo: photo_url
                };
                res.send(place_photo);
            });
        });
    }

    function getPlaceDetails(req, res) {
        var place_id = req.params.place_id;
        var endpoint = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + place_id + '&key=' + api_key;

        https.get(endpoint, function(response) {
            var placeDetails = '';
            response.on('data', function (chunk) {
                placeDetails += chunk;
            });
            response.on('end', function() {
                placeDetails = JSON.parse(placeDetails);
                res.send(placeDetails);
            });
        });
    }

};