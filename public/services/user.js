angular.module('myApp')
.factory('User', ['$resource', function($resource) {
    return $resource('/profile/current', null, {
        'update': { method: 'PUT' }
    });     
}]);