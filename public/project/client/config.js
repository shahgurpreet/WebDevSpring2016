/**
 * Created by Gurpreet on 2/23/2016.
 */
(function(){
    angular
        .module("WanderMustApp")
        .config(configuration);

    function configuration($routeProvider, $httpProvider) {

        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $routeProvider
            .when("/home",{
                templateUrl: "./views/home/home.view.html",
                controller: "HomeController"
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
                controller: "ProfileController"
            })
            .when("/admin", {
                templateUrl: "./views/admin/admin.view.html"
            })
            .when("/forms", {
                templateUrl: "./views/forms/forms.view.html",
                controller: "FormController"
            })
            .when("/form-fields", {
                templateUrl: "./views/forms/fields.view.html"
            })
            .when("/search/:city", {
                templateUrl: "./views/search/search.view.html",
                controller: "SearchController"
            })
            .when("/details/:name/:vicinity/:place_id/:lat/:long", {
                templateUrl: "./views/details/details.view.html",
                controller: "DetailsController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
