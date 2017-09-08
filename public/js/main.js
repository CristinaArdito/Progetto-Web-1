angular.module('myApp.controllers', ['ngAnimate', 'ngTouch', 'ngFader', 'uiGmapgoogle-maps', 'chart.js'])
.controller('mainController',['$scope', 'DataService','$location', 'CurrentUserService','$state', 
function($scope, DataService, $location,CurrentUserService, $state) {
    
    $scope.logout = function(){
        CurrentUserService.logout();
        $state.go('home');
    }

    $scope.initCategory = function(data){
        DataService.set(data);
    }

    if(CurrentUserService.isLogged() == true){
        $state.go('loggedHome');
    }else{
        $state.go('home');
    }
}]);

