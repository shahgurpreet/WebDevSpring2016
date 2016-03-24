/**
 * Created by Gurpreet on 3/23/2016.
 */
module.exports = function(app) {

    var stringSimilarity  = require('string-similarity');
    app.put('/api/similarity/:place', getSimilarityMeasure);

    function getSimilarityMeasure(req, res) {
        var place = req.params.place;
        var insta_places = req.body.insta_places;

        var insta_places_array = [];
        var insta_places_json = {};

        for(var i = 0; i < insta_places.length; i++) {
            var insta_place = insta_places[i];
            insta_places_array.push(insta_place.name);
            insta_places_json[insta_place.name] = insta_place.id;
        }

        var sim = stringSimilarity.findBestMatch(place,insta_places_array);
        var closestInstaPlace = sim.bestMatch.target;
        res.send(insta_places_json[closestInstaPlace]);
    }

};