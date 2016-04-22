(function () {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, $rootScope, UserService) {
        {
            $scope.remove = remove;
            $scope.update = update;
            $scope.add    = add;
            $scope.select = select;
            $scope.predicate = '';
            $scope.reverse = true;
            $scope.order = function(predicate) {
                $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                $scope.predicate = predicate;
            };

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
                $scope.user = null;
                UserService
                    .updateUser(user._id, user)
                    .then(handleSuccess, handleError);
            }

            function add(user)
            {
                $scope.user = null;
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