(function () {
    angular
        .module("WanderMustApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $rootScope, UserService) {
        {
            $scope.remove = remove;
            $scope.update = update;
            $scope.add    = add;
            $scope.select = select;

            function init() {
                UserService
                    .findAllUsers()
                    .then(handleSuccess, handleError);
            }
            init();

            function remove(user)
            {
                if(user._id === $rootScope.currentUser._id) {
                    $scope.error = 'You need other admins to complete this process.';
                } else {
                    UserService
                        .deleteUserById(user._id)
                        .then(handleSuccess, handleError);
                }
            }

            function update(user)
            {
                UserService
                    .updateUser(user._id, user)
                    .then(handleSuccess, handleError);
            }

            function add(user)
            {
                UserService
                    .createUser(user)
                    .then(handleSuccess, handleError);
                init();
            }

            function select(user)
            {
                $scope.user = angular.copy(user);
            }

            function handleSuccess(response) {
                if(response.data != undefined) {
                    $scope.users = response.data;
                }else {
                    $scope.users = response;
                }
            }

            function handleError(error) {
                $scope.error = error;
            }
        }
    }
})();