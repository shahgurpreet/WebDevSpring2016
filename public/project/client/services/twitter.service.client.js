/**
 * Created by Gurpreet on 3/4/2016.
 */
"use strict";
(function(){
    angular
        .module("WanderMustApp")
        .factory("TwitterService", TwitterService);

    function TwitterService($http) {

        var api = {
            getTwitterPosts: getTwitterPosts
        };
        return api;


        function getTwitterPosts(tag, callback) {
            $http.get("/api/twitter/" + tag).success(function (response) {
                var statuses = response.statuses;
                var twitterPosts = [];
                for(var i = 0; i < statuses.length; ++i) {
                    var status = statuses[i];
                    var entities = status.entities;
                    var text = status.text;
                    if(entities.media) {
                        twitterPosts.push({
                            status: text,
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

    }
})();

