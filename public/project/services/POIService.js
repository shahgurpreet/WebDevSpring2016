/**
 * Created by Gurpreet on 3/3/2016.
 */
"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .factory("POIService", POIService);

    var api_key = 'AIzaSyD8M-KBuFrLLvqhQ5eMTpOMXhamomRfwZ4';
    var endpoint = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=500&location=' + '-33.8670522,151.1957362&key='+ api_key;

    function POIService($http) {

        var api = {
            findPOIPerCity : findPOIPerCity
        };
        return api;

        function findPOIPerCity(city, callback) {

            // this will be done from the server side because of CORS issue
            /*$http({
                url: endpoint,
                async: false,
                jsonpCallback: 'jsonCallback',
                contentType: "application/json",
                dataType: 'jsonp'
            }).
            success(function(status) {
                console.log(status);
            }).
            error(function(status) {
                //your code when fails
            });*/

            console.log(city);
            //for now hardcoding some places of interest for New South Wales, Australia
            var places = [
                {name: "The Star", place_id: "ChIJq6qq6jauEmsRJAf7FjrKnXI", vicinity: "80 Pyrmont Street, Pyrmont", photo:"https://upload.wikimedia.org/wikipedia/commons/c/c9/The_Star_Casino_-_Vivid_Sydney_2015.jpg"},
                {name: "Darling Harbour", place_id: "ChIJt9trB0euEmsR8NbepO14j3M", vicinity: "Sydney", photo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Sydney_sunset_darling_harbour.jpg"},
                {name: "Australian National Maritime Museum", place_id: "ChIJTze93zmuEmsRhvE6T4Y9DhU", vicinity: "2 Murray Street, Sydney", photo: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Australian_National_Maritime_Museum_and_ships.jpg"},
                {name: "South Steyne", place_id: "ChIJt9trB0euEmsRHdhhqjr37n4", vicinity: "Harbourside Jetty, Darling Drive, Darling Harbour", photo: "https://upload.wikimedia.org/wikipedia/commons/5/59/South_Steyne_Floating_Restaurant_(8355503958).jpg" },
                {name: "Sydney Lyric Theatre", place_id: "ChIJ1-v38TauEmsRxXV8BJ53Fq4", vicinity: "Pirrama Road, Sydney",photo: "http://www.sydneylyric.com.au/content/backgrounds/tickets-header.jpg.ashx?width=1920&height=1320"},
                {name: "ibis Sydney Darling Harbour", place_id: "ChIJFfyzTTeuEmsRuMxvFyNRfbk", vicinity: "70 Murray Street, Pyrmont", photo: "http://commondatastorage.googleapis.com/static.panoramio.com/photos/original/40277051.jpg"},
                    {name: "Blue Fish", place_id: "ChIJBaqDDzquEmsRcCI5e-3rStM", vicinity: "Harbourside Shopping Centre, Darling Drive, Darling Harbour", photo: "https://d1wb0ukcj65cfk.cloudfront.net/restaurant_original/54311db7-50a9-4ff0-92e8-cd189b9a89b4.jpg"},
                {name: "Flying Fish Restaurant & Bar", place_id: "ChIJm7Ex8UmuEmsR37p4Hm0D0VI", vicinity: "Lower Deck, Jones Bay Wharf, 21 Pirrama Road, Pyrmont", photo: "https://thebluemacaron.files.wordpress.com/2013/08/20130730_181604_lls.jpg"},
                {name: "Doltone House", place_id: "ChIJr9ZMJD6uEmsRT5yQWJvTmd0", vicinity: "26-32 Pirrama Road, Pyrmont", photo: "http://www.doltonehouse.com.au/uploads//background-images/bg_slideshows_new_267/diw/darling-island-wharf-04.jpg"},
                {name: "The Little Snail Restaurant", place_id: "ChIJtwapWjeuEmsRcxV5JARHpSk", vicinity: "50 Murray Street, Pyrmont", photo: "https://s3-ap-southeast-2.amazonaws.com/static.yumtable.com.au/restaurant/the-little-snail1507/gallery_venue9_The+Little+Snail_1200x800.jpg"},
                {name: "Astral Tower & Residences", place_id: "ChIJq6qq6jauEmsR46KYci7M5Jc", vicinity: "80 Pyrmont Street, Sydney", photo: "http://www.worldhotels.com/usercontent/worldhotels/hotels/australia/australia/sydney/astral-tower-residences-at-the-star-1-suite.jpg?width=1920&quality=50&tint=aeaeae"},
                {name: "Criniti's Darling Harbour", place_id: "ChIJL7SCpzCuEmsRTt1uJsaxMBQ", vicinity: "2-10 Darling Drive, Sydney", photo: "http://gp2projects.com/wp-content/uploads/2013/07/project-crinitis-hero.jpg"},
                {name: "Pancakes On The Rocks", place_id: "ChIJL7SCpzCuEmsRlXKRwNalzww", vicinity: "Harbourside Shopping Centre, 230, Darling Harbour", photo: "http://temp01.1ptstaging.com.au/wp-content/uploads/2014/10/pancakes-on-the-rocks-faq.jpg"},
                {name: "Cafe XXII", place_id: "ChIJGZ2lxTauEmsRJ1C7wmla-3I", vicinity: "22 Union Street, Pyrmont", photo:"https://gastronomous.files.wordpress.com/2010/03/cafe-xxii.jpg"},
                {name: "Hurricane's Grill Darling Harbour", place_id: "ChIJL7SCpzCuEmsRN8MD9vPXmOs", vicinity: "Harbourside Shopping Centre, 433-436 Darling Drive, Sydney", photo: "https://darlingharbour.hurricanesgrill.com.au/wp-content/uploads/2015/02/IMG_5260.jpg"}
            ];

            callback(places);
        }
    }
})();
