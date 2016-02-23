/**
 * Created by Gurpreet on 2/23/2016.
 */
/**
 * Created by Gurpreet on 2/23/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $location, $scope, UserService) {

        // event handler declarations
        $scope.update = update;

        // event handler implementation
        function update(currentUser) {
            var userId = $rootScope.currentUser._id;
            UserService.updateUser(userId, currentUser, processNewUser);
        }

        function processNewUser(user) {
            console.log(user);
            $rootScope.currentUser = user;
        }
    }
})();


