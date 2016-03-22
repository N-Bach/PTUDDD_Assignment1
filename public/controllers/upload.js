function UploadCtrl($scope, User) {

    $scope.hello = 'What\'s up bitches!!!';    

}

UploadCtrl.$inject = ['$scope', 'User'];

angular.module('myApp')
    .controller('UploadCtrl', UploadCtrl);
