var pwApp = angular.module('pwApp');
// create the controller and inject Angular's $scope
 pwApp.controller('loginController', ['$scope', 'CurrentUserService', function($scope, CurrentUserService)
   {
    $scope.email;
    $scope.password;

    $scope.login = function()
      {
       CurrentUserService.login($scope.email, $scope.password)
          .then(function(data)
               {
                console.log("Data "+data);
                alert('utente loggato '+JSON.stringify(data));
               })
          .catch(function(err)
                {
                 //vedo il codice d'errore sulla documentazione del server
                 // in base all'errore, lo gestisco
                 if (err.code == 'ERR_API_WRONG_PSW')
                   { alert('password errata'); }
                 else if (err.code == 'ERR_API_NOT_FOUND')
                   { alert('utente non trovato'); }
                 else
                   { alert(err.message);}

                 // resetto (pulisco) le caselle di input
             //    $scope.username=undefined;
               //  $scope.password=undefined;
                });
      }
   }]);
