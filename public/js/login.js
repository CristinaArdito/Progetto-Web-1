var pwApp = angular.module('pwApp');
// create the controller and inject Angular's $scope
 pwApp.controller('loginController', ['$scope', 'CurrentUserService', '$state', function($scope, CurrentUserService, $state)
   {
    $scope.email;
    $scope.password;

    $scope.login = function()
      {
       CurrentUserService.login($scope.email, $scope.password)
          .then(function(token)
               {
                //alert('utente loggato '+token);
                $state.go('loggedHome');
               })
          .catch(function(err)
                {
                 alert("Credenziali errate"); 
                });
      }
   }]);
