function EditCtrl($scope, User) {

    $scope.hello = 'What\'s up bitches!!!';

    User.get(function(data) {
        $scope.user = data;
    });

    $scope.print = function() {
        console.log($scope.user);
    };

    $scope.update = function() {
        User.update({}, $scope.user);        
        swal("Updated!", "Successfully updated Information", "success")
    };

}

EditCtrl.$inject = ['$scope', 'User'];

angular.module('myApp')
    .controller('EditCtrl', EditCtrl);
