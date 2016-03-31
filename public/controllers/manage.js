function ManageCtrl($scope, User) {

    $scope.hello = 'What\'s up bitches!!!';    

    User.get(function(data) {
        $scope.user = data;
        //console.log($scope.user.image);
        $scope.img = $scope.user.image;
    });   

}

ManageCtrl.$inject = ['$scope', 'User'];

angular.module('myApp')
    .controller('ManageCtrl', ManageCtrl);
