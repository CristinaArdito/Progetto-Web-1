var pwApp = angular.module('pwApp');
// create the controller and inject Angular's $scope
 pwApp.controller('signupController', ['$scope', 'CurrentUserService','$state', '$location',
 function($scope, CurrentUserService, $state,$location)
   {
    $scope.username;
    $scope.password;
    $scope.email;


    $scope.signup = function()
      {

      CurrentUserService.getAllUser()
      .then(function(data){
        
        data = data.data;
        flag = 0;

        for(i=0;i<data.length;i++){
          if(data[i].email == $scope.email){
            alert("Email già in uso");
            flag=1;
          }
        }

        if(flag == 0){
          CurrentUserService.signup($scope.username, $scope.password, $scope.email)
          .then(function(data)
               {
               	console.log("signup");
               	$location.path("/");
                $state.go('home');
               })
          .catch(function(err)
                { 
                alert("Errore durante la creazione dell'account, riprovare più tardi");
                });
        }
      })
      }
   }]);
