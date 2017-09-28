angular.module('myApp.controllers', ['ngAnimate', 'ngTouch', 'ngFader', 'uiGmapgoogle-maps', 'chart.js'])
.controller('mainController',['$scope', 'DataService','$location', 'CurrentUserService','$state', 
function($scope, DataService, $location,CurrentUserService, $state) {
    
    isLogged = false;
    

    $scope.logout = function(){
        CurrentUserService.logout();
        $state.go('home');
    }

    $scope.initCategory = function(data){
        DataService.set(data);
    }

    if(isLogged == false){
        if(CurrentUserService.isLogged() == true){
            if(CurrentUserService.isAdmin() == true){
                $state.go('loggedHomeAdmin');
            }else{
                $state.go('loggedHome');
            }
        }else{
            $state.go('home');
        }
    }
}]);

