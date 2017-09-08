var pwApp = angular.module('pwApp');
// create the controller and inject Angular's $scope
 pwApp.controller('signupController', ['$scope', 'CurrentUserService', function($scope, CurrentUserService)
   {
    $scope.username;
    $scope.password;
    $scope.email;

    console.log("Scope: ");
    console.log($scope);

    $scope.signup = function()
      {
      console.log("signUp");

      CurrentUserService.getAllUser().
      then(function(data){
        
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
                console.log("Data");
                console.log(data);
                alert('utente registrato '+JSON.stringify(data));
               })
          .catch(function(err)
                { 
                alert(err);
                });
        }
      })
      }
   }]);
