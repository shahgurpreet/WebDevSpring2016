/**
 * Created by Gurpreet on 3/4/2016.
 */
(function(){
    angular
        .module("WanderMustApp")
        .factory("TwitterService", TwitterService);

    function TwitterService($http) {
        var nextPageToken = '0';
        var api = {
            getTwitterPosts: getTwitterPosts,
            twitterNext: twitterNext
        };
        return api;


        function getTwitterPosts(tag, newTwit, callback) {
            var token = '0';
            if(newTwit) {
                token = '0';
            } else {
                token = nextPageToken;
            }
            $http.get("/api/twitter/" + tag + "/" + token).success(function (response) {
                var metadata = response.search_metadata;
                if(metadata.next_results != undefined) {
                    var max_id= metadata.next_results.substr(0, metadata.next_results.indexOf('&'));
                    max_id = max_id.substr(8);
                    nextPageToken = max_id;
                } else {
                    nextPageToken = '0';
                }
                var statuses = response.statuses;
                var twitterPosts = [];
                for(var i = 0; i < statuses.length; ++i) {
                    var status = statuses[i];
                    var entities = status.entities;
                    var text = status.text;
                    if(entities.media) {
                        twitterPosts.push({
                            tags: text,
                            photo: entities.media[0].media_url_https
                        });
                    }
                }
                /*var twitterPhotos = twitterPhotos_1.filter(function(elem, pos) {
                    return twitterPhotos_1.indexOf(elem) == pos;
                });*/
                callback(twitterPosts);
            });
        }

        function twitterNext(tag, callback) {
            if(nextPageToken != '0') {
                getTwitterPosts(tag, false, nextResults);
                function nextResults(response) {
                    callback(response);
                }
            } else {
                callback([]);
            }
        }

    }
})();

