/**
 * Created by Gurpreet on 3/3/2016.
 */
"use strict";

(function(){
    angular
        .module("FormBuilderApp")
        .factory("POIService", POIService);

    function POIService($http,$q) {

        var api = {
            findPOIPerCity : findPOIPerCity,
            findPhotos: findPhotos
        };
        return api;

        function findPhotos(places_1, callback) {
            var promiseArray = [];
            var places = [];
            for(var i=0; i<places_1.length; i++) {
                var photo = places_1[i].photo;
                promiseArray.push($http.get("/api/hello1/"+ photo).success(function (response) {
                    places.push(response);
                }));
            }

            $q.all(promiseArray).then(function () {
                for(var i = 0; i < places_1.length; i++) {
                    var newPhoto = places[i];
                    places_1[i].photo = newPhoto;
                }
                callback(places_1);
            })
        }

        function findPOIPerCity(city, callback) {
            var places_1;
            var promiseArray = [];
            $http.get("/api/hello/"+city).success(function(response) {
                var response = response.results;
                places_1 = [];
                for(var r=0; r < response.length; r++) {
                    var place = response[r];
                    var poi = {
                        name: place.name,
                        place_id: place.place_id,
                        vicinity: place.vicinity
                    };
                    if(place.photos) {
                        poi.photo = place.photos[0].photo_reference;
                        places_1.push(poi);
                    }
                }
                callback(places_1);
            });

            //for now hardcoding some places of interest for New South Wales, Australia
            var places = [
                {name: "The Dunkirk Hotel", place_id: "ChIJ4UEnPTGuEmsRkjpDW7FRSko", vicinity: "205 Harris Street, Pyrmont", photo:"http://www.rnfoster.com/wp-content/uploads/2013/10/dunkirk-edit.png"},
                {name: "Darling Harbour", place_id: "ChIJt9trB0euEmsR8NbepO14j3M", vicinity: "Sydney", photo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Sydney_sunset_darling_harbour.jpg"},
                {name: "Australian National Maritime Museum", place_id: "ChIJTze93zmuEmsRhvE6T4Y9DhU", vicinity: "2 Murray Street, Sydney", photo: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Australian_National_Maritime_Museum_and_ships.jpg"},
                {name: "South Steyne", place_id: "ChIJt9trB0euEmsRHdhhqjr37n4", vicinity: "Harbourside Jetty, Darling Drive, Darling Harbour", photo: "https://upload.wikimedia.org/wikipedia/commons/5/59/South_Steyne_Floating_Restaurant_(8355503958).jpg" },
                {name: "Sydney Lyric Theatre", place_id: "ChIJ1-v38TauEmsRxXV8BJ53Fq4", vicinity: "Pirrama Road, Sydney",photo: "http://www.sydneylyric.com.au/content/backgrounds/tickets-header.jpg.ashx?width=1920&height=1320"},
                {name: "ibis Sydney Darling Harbour", place_id: "ChIJFfyzTTeuEmsRuMxvFyNRfbk", vicinity: "70 Murray Street, Pyrmont", photo: "http://commondatastorage.googleapis.com/static.panoramio.com/photos/original/40277051.jpg"},
                {name: "Blue Fish", place_id: "ChIJBaqDDzquEmsRcCI5e-3rStM", vicinity: "Harbourside Shopping Centre, Darling Drive, Darling Harbour", photo: "https://d1wb0ukcj65cfk.cloudfront.net/restaurant_original/54311db7-50a9-4ff0-92e8-cd189b9a89b4.jpg"},
                {name: "Flying Fish Restaurant & Bar", place_id: "ChIJm7Ex8UmuEmsR37p4Hm0D0VI", vicinity: "Lower Deck, Jones Bay Wharf, 21 Pirrama Road, Pyrmont", photo: "https://thebluemacaron.files.wordpress.com/2013/08/20130730_181604_lls.jpg"},
                {name: "Doltone House", place_id: "ChIJr9ZMJD6uEmsRT5yQWJvTmd0", vicinity: "26-32 Pirrama Road, Pyrmont", photo: "http://www.doltonehouse.com.au/uploads//background-images/bg_slideshows_new_267/diw/darling-island-wharf-04.jpg"},
                {name: "The Little Snail Restaurant", place_id: "ChIJtwapWjeuEmsRcxV5JARHpSk", vicinity: "50 Murray Street, Pyrmont", photo: "https://s3-ap-southeast-2.amazonaws.com/static.yumtable.com.au/restaurant/the-little-snail1507/gallery_venue9_The+Little+Snail_1200x800.jpg"},
                {name: "Blue Eye Dragon", place_id: "ChIJuZqIiTauEmsRJF_TK9Vpfmw", vicinity: "37 Pyrmont Street, Pyrmont", photo: "https://bosguydotcom.files.wordpress.com/2014/02/blue-dragon-photo-credit-melissa-ostrow.jpg"},
                {name: "Criniti's Darling Harbour", place_id: "ChIJL7SCpzCuEmsRTt1uJsaxMBQ", vicinity: "2-10 Darling Drive, Sydney", photo: "http://gp2projects.com/wp-content/uploads/2013/07/project-crinitis-hero.jpg"},
                {name: "Pancakes On The Rocks", place_id: "ChIJL7SCpzCuEmsRlXKRwNalzww", vicinity: "Harbourside Shopping Centre, 230, Darling Harbour", photo: "http://temp01.1ptstaging.com.au/wp-content/uploads/2014/10/pancakes-on-the-rocks-faq.jpg"},
                {name: "Cafe XXII", place_id: "ChIJGZ2lxTauEmsRJ1C7wmla-3I", vicinity: "22 Union Street, Pyrmont", photo:"https://gastronomous.files.wordpress.com/2010/03/cafe-xxii.jpg"},
                {name: "Hurricane's Grill Darling Harbour", place_id: "ChIJL7SCpzCuEmsRN8MD9vPXmOs", vicinity: "Harbourside Shopping Centre, 433-436 Darling Drive, Sydney", photo: "https://darlingharbour.hurricanesgrill.com.au/wp-content/uploads/2015/02/IMG_5260.jpg"}
            ];
        }
    }
})();
