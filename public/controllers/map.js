function MapCtrl($scope, User) {

    $scope.hello = 'What\'s up bitches!!!';    

}

MapCtrl.$inject = ['$scope', 'User'];

angular.module('myApp')
    .controller('MapCtrl', MapCtrl);
