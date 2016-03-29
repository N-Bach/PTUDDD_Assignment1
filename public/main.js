var app = angular.module('myApp', ['ngRoute', 'ngResource', 'ui.event', 'ui.map']);

app.config(['$locationProvider','$routeProvider', 
  function($locationProvider, $routeProvider) {

    /*$locationProvider.html5Mode(true);*/

    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/upload', {
            templateUrl: 'partials/upload.html',
            controller: 'UploadCtrl'
        })
        .when('/manage', {
            templateUrl: 'partials/manage.html',
            controller: 'ManageCtrl'
        })
        .when('/aboutus', {
            templateUrl: 'partials/aboutus.html',
            controller: 'AboutUsCtrl'
        })
        .when('/map', {
            templateUrl: 'partials/map.html',
            controller: 'MapCtrl'
        })      
        .when('/edit', {
            templateUrl: 'partials/edit.html',
            controller: 'EditCtrl'
        })        
        .otherwise({
            redirectTo: '/'
        });
}]);