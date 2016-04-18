function AboutUsCtrl($scope, User) {    
    
}

AboutUsCtrl.$inject = ['$scope', 'User'];

angular.module('myApp')
    .controller('AboutUsCtrl', AboutUsCtrl);

function DetailCtrl($scope, $http, $location, User) {

    User.get(function(data) {
        $scope.user = data;
    });

    $scope.userFilter = '';
    $scope.sortType = '';
    $scope.sortReverse = false;

    $scope.clickSort = function(type) {
        $scope.sortReverse = !$scope.sortReverse;
        $scope.sortType = type;
    };

    $http.get('/api/users/all').then(function(data) {
        $scope.data = data.data;                
    },function(err) {
        sweetAlert("Oops...", "Cannot get User list", "error");
        $location.path('/profile');
    });    
    
    $scope.checkCurrent = function(email) {
        return $scope.user.local.email == email;
    }
}

DetailCtrl.$inject = ['$scope', '$http', '$location', 'User'];

angular.module('myApp')
    .controller('DetailCtrl', DetailCtrl);

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

function HomeCtrl($scope, User) {

    $scope.hello = 'What\'s up bitches!!!';

    User.get(function(data) {
        $scope.user = data;
    });        
}

HomeCtrl.$inject = ['$scope', 'User'];

angular.module('myApp')
    .controller('HomeCtrl', HomeCtrl);

function ManageCtrl($scope, User) {

    $scope.uploaded = false;    

    User.get(function(data) {
        $scope.user = data;
        //console.log($scope.user.image);
        $scope.images = $scope.user.image;
        console.log($scope.images.length);
        $scope.uploaded = $scope.images.length > 0 ? true : false;
        console.log($scope.uploaded);
    });   

}

ManageCtrl.$inject = ['$scope', 'User'];

angular.module('myApp')
    .controller('ManageCtrl', ManageCtrl);

function MapCtrl($scope, User) {
    

    $scope.lat = "0";
    $scope.lng = "0";
    $scope.accuracy = "0";
    $scope.error = "";
    $scope.model = { myMap: undefined };
    $scope.myMarkers = [];

    $scope.showResult = function () {
        return $scope.error == "";
    }

    $scope.mapOptions = {
        center: new google.maps.LatLng($scope.lat, $scope.lng),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.showPosition = function (position) {
        $scope.lat = position.coords.latitude;
        $scope.lng = position.coords.longitude;
        $scope.accuracy = position.coords.accuracy;
        $scope.$apply();

        var latlng = new google.maps.LatLng($scope.lat, $scope.lng);
        $scope.model.myMap.setCenter(latlng);
        $scope.myMarkers.push(new google.maps.Marker({ map: $scope.model.myMap, position: latlng }));
    }

    $scope.showError = function (error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                $scope.error = "User denied the request for Geolocation."
                break;
            case error.POSITION_UNAVAILABLE:
                $scope.error = "Location information is unavailable."
                break;
            case error.TIMEOUT:
                $scope.error = "The request to get user location timed out."
                break;
            case error.UNKNOWN_ERROR:
                $scope.error = "An unknown error occurred."
                break;
        }
        $scope.$apply();
    }

    $scope.getLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
        }
        else {
            $scope.error = "Geolocation is not supported by this browser.";
        }
    }

    $scope.getLocation();    

}

MapCtrl.$inject = ['$scope', 'User'];

angular.module('myApp')
    .controller('MapCtrl', MapCtrl);

function UploadCtrl($scope, $http, User) {

    $scope.uploading = false;

    User.get(function(data) {
        $scope.user = data;
    });    
    
    $scope.myFile = {};

    $scope.upload = function() {
        $scope.uploading = true;
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
                $scope.uploading = false;
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
