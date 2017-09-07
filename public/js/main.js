angular.module('myApp.controllers', ['ngAnimate', 'ngTouch', 'ngFader', 'uiGmapgoogle-maps', 'chart.js'])
.controller('mainController',['$scope', 'DataService','$location', function($scope, DataService, $location) {
    
    $scope.initCategory = function(data){
        DataService.set(data);
        console.log(data);
    }
}]);

