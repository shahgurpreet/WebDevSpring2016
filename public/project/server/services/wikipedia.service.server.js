/**
 * Created by Gurpreet on 4/2/2016.
 */
module.exports = function(app) {

    var https = require('https');
    var wikipedia = require("wikipedia-js")

    app.get('/api/wikipedia/:query', getPlaceSummary);

    function getPlaceSummary(req, res) {
        var query = req.params.query;
        var options = {query: query, format: "html", summaryOnly: true};
        wikipedia.searchArticle(options, function(err, htmlWikiText){
            if(err){
                console.log("An error occurred[query=%s, error=%s]", query, err);
                return;
            }
            res.send(htmlWikiText);
        });
    }
};

