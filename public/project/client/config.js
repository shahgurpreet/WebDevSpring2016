/**
 * Created by Gurpreet on 2/23/2016.
 */
(function(){
    angular
        .module("WanderMustApp")
        .config(configuration);

    function configuration($routeProvider, $httpProvider) {

        $routeProvider
            .when("/home",{
                templateUrl: "./views/home/home.view.html",
                controller: "HomeController",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/register", {
                templateUrl: "./views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "./views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "./views/users/profile.view.html",
                controller: "ProfileController",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/favorites", {
                templateUrl: "./views/favorites/favorites.view.html",
                controller: "FavoritesController",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/search/:city", {
                templateUrl: "./views/search/search.view.html",
                controller: "SearchController",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/details/:name/:vicinity/:place_id/:lat/:long", {
                templateUrl: "./views/details/details.view.html",
                controller: "DetailsController",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/follow/:username/:userId", {
                templateUrl: "./views/follow/follow.view.html",
                controller: "FollowController",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };


})
();
