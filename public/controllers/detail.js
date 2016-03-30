function DetailCtrl($scope, $http, $location, User) {

    User.get(function(data) {
        $scope.user = data;
    });

    $scope.userFilter = '';
    $scope.sortType = '';
    $scope.sortReverse = false;

    $scope.clickSort = function(type) {
        $scope.sortReverse = !$scope.sortReverse;
        $scope.sortType = type;
    };

    $http.get('/api/users/all').then(function(data) {
        $scope.data = data.data;                
    },function(err) {
        sweetAlert("Oops...", "Cannot get User list", "error");
        $location.path('/profile');
    });    
    
    $scope.checkCurrent = function(email) {
        return $scope.user.local.email == email;
    }
}

DetailCtrl.$inject = ['$scope', '$http', '$location', 'User'];

angular.module('myApp')
    .controller('DetailCtrl', DetailCtrl);
