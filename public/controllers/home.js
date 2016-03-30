function HomeCtrl($scope, User) {

    $scope.hello = 'What\'s up bitches!!!';

    User.get(function(data) {
        $scope.user = data;
    });    
        

    /*console.log(">>>>>>>>>>>>>>");
    console.log($scope.user);*/
    

}

HomeCtrl.$inject = ['$scope', 'User'];

angular.module('myApp')
    .controller('HomeCtrl', HomeCtrl);
