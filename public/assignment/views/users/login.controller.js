/**
 * Created by Gurpreet on 2/23/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, $scope, UserService) {

        // event handler declarations
        $scope.login = login;

        // event handler implementation
        function login(unloggedUser) {
            var username = unloggedUser.username;
            var password = unloggedUser.password;
            UserService.findUserByCredentials(username, password, processUser);
        }

        function processUser(user) {
            console.log(user);
            $rootScope.currentUser = user;
            $location.url("/profile/");
        }
    }
})();


