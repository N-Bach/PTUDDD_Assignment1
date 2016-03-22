function AboutUsCtrl($scope, User) {

    $scope.hello = 'What\'s up bitches!!!';
    
}

AboutUsCtrl.$inject = ['$scope', 'User'];

angular.module('myApp')
    .controller('AboutUsCtrl', AboutUsCtrl);
