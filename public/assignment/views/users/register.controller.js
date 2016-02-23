/**
 * Created by Gurpreet on 2/23/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $location, $scope, UserService) {

        // event handler declarations
        $scope.register = register;

        // event handler implementation
        function register(newUser) {
            console.log(newUser);
            UserService.createUser(newUser, processNewUser);
        }

        function processNewUser(user) {
            $rootScope.currentUser = user;
            $location.url("/profile/");
        }
    }
})();
