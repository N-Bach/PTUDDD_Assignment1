function UploadCtrl($scope, $http, User) {

    User.get(function(data) {
        $scope.user = data;
    });    
    
    $scope.myFile = {};

    $scope.upload = function() {
        $http({
            headers: {'Authorization': 'Client-ID ae6e3c4095f9247'},
            url: '  https://api.imgur.com/3/upload',
            method: 'POST',            
            data: {
                image: $scope.myFile.base64, 
                'type':'base64'
            }
        }).then(function successCallback(response) {            
            //console.log('called and successful', response);
            var url = response.data.data.link;
            $http({
                url: ("/api/users/" + $scope.user._id),
                method: 'PUT',
                data: { url: url} 
            }).then(function(data) {
                swal("Oh YEAH!!!!","Picture Uploaded", "success");            
            }, function(err) {
                sweetAlert("Oops...", "Something went wrong!", "error");
            });
        }, function errorCallback(err) {
            sweetAlert("Oops...", "Something went wrong!", "error");
        });
    };

}

UploadCtrl.$inject = ['$scope', '$http', 'User'];

angular.module('myApp')
    .controller('UploadCtrl', UploadCtrl);
