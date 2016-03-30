function DetailCtrl($scope, $http, User, NgTableParams) {

    $scope.hello = 'What\'s up bitches!!!';

    $http.get('/api/users/all').then(function(data) {
        $scope.data = data.data;
        console.log($scope.data2);  
    });
    
    
    $scope.tableParams = new NgTableParams({
        page: 1, 
        count: 10         
    }, { 
        dataset: $scope.data
    });
    
}

DetailCtrl.$inject = ['$scope', '$http', 'User', 'NgTableParams'];

angular.module('myApp')
    .controller('DetailCtrl', DetailCtrl);
