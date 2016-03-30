function EditCtrl($scope, $http, $location, User) {

    $scope.hello = 'What\'s up bitches!!!';

    User.get(function(data) {
        $scope.user = data;
    });

    $scope.print = function() {
        console.log($scope.user);
    };

    $scope.callDelete = function() {
        $http.delete('api/users/' + $scope.user._id) 
            .success(function() {                
                swal({   
                    title: "User Deleted!",   
                    text: "Log out in 2 seconds.",   
                    timer: 2000,   
                    showConfirmButton: false 
                });                
                setTimeout(function(){ window.location.href = "/logout"; }, 2000);                
            })
            .error(function(err) {
                sweetAlert("Oops...", "Something went wrong!", "error");
            });
    }

    $scope.updateUser = function() {
        User.update({}, $scope.user);        
        swal("Updated!", "Successfully updated Information", "success")
    };

    $scope.deleteUser = function() {
        swal({   
            title: "Are you sure?",   
            text: "You will lost all data uploaded to this user.",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Yes, delete it!",   
            closeOnConfirm: false 
        }, function(){   
            $scope.callDelete();
        });
    };

}

EditCtrl.$inject = ['$scope', '$http', '$location', 'User'];

angular.module('myApp')
    .controller('EditCtrl', EditCtrl);
