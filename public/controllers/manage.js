function ManageCtrl($scope, User) {

    $scope.uploaded = false;    

    User.get(function(data) {
        $scope.user = data;
        //console.log($scope.user.image);
        $scope.images = $scope.user.image;
        console.log($scope.images.length);
        $scope.uploaded = $scope.images.length > 0 ? true : false;
        console.log($scope.uploaded);
    });   

}

ManageCtrl.$inject = ['$scope', 'User'];

angular.module('myApp')
    .controller('ManageCtrl', ManageCtrl);
