function ManageCtrl($scope, User) {

    $scope.hello = 'What\'s up bitches!!!';    

}

ManageCtrl.$inject = ['$scope', 'User'];

angular.module('myApp')
    .controller('ManageCtrl', ManageCtrl);
