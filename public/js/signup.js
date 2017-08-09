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
       console.log($scope);
       CurrentUserService.signup($scope.username, $scope.password, $scope.email)
          .then(function(data)
               {
                console.log("Data");
                console.log(data);
                alert('utente registrato '+JSON.stringify(data));
               })
          .catch(function(err)
                { 
                
                alert(err.message);

                 // resetto (pulisco) le caselle di input
             //    $scope.username=undefined;
               //  $scope.password=undefined;
                });
      }

       // create a message to display in our view
     //  $scope.message = 'Prova a cambiare questo messaggio';
   }]);
