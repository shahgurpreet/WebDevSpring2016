/**
 * Created by Gurpreet on 3/4/2016.
 */
"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .factory("TwitterService", TwitterService);

    function TwitterService($q) {
        var authorizationResult = false;

        var api = {
            initialize: initialize,
            isReady: isReady,
            connectTwitter: connectTwitter,
            clearCache: clearCache,
            getLatestTweets: getLatestTweets
        };
        return api;

        function initialize() {
            console.log('here');
            //initialize OAuth.io with public key of the application
            OAuth.initialize('-vQO1WLtgJIdP3-hziieU67vg14');
            OAuth.popup('twitter').done(function(result) {
                console.log(result);
            }).fail(function(err) {
                console.log(err);
            })
        }

        function isReady() {
            return authorizationResult;
        }

        function connectTwitter() {
            var deferred = $q.defer();
            OAuth.popup('twitter', {cache:true}, function(error, result) {
                //cache means to execute the callback
                // if the tokens are already present
                if (!error) {
                    authorizationResult = result;
                    console.log(result);
                    deferred.resolve();
                } else {
                    //do something if there's an error
                }
            });
            return deferred.promise;
        }

        function clearCache() {
            OAuth.clearCache('twitter');
            authorizationResult = false;
        }

        function getLatestTweets() {
            //create a deferred object using Angular's $q service
            var deferred = $q.defer();
            var promise = authorizationResult.get('/1.1/statuses/home_timeline.json').done(function(data) { //https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline
                //when the data is retrieved resolved the deferred object
                deferred.resolve(data)
            });
            //return the promise of the deferred object
            return deferred.promise;
        }
    }
})();

