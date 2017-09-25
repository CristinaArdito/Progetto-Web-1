angular.module('myApp.controllers')
.controller('editSupplierController', ['$scope', '$compile', '$http' , '$location' ,'DataService', 'SupplierService',
function($scope, $compile, $http, $location, DataService, SupplierService) {
    

    $scope.init = function(){

        var data = DataService.get();

        console.log(data);

        html = '<span>Nome fornitore: </span><input type="text" id="name" value="'+data.name+'"></input><br>'+
               '<span>Email: </span><input type="text" id="email" value="'+data.email+'"></input><br>'+
               '<span>Numero di Telefono: </span><input type="text" id="tel" value="'+data.ntel+'"></input><br>'+
               '<span>Via: </span><input type="text" id="via" value="'+data.via+'"></input><br>'+
               '<span>Città: </span><input type="text" id="city" value="'+data.city+'"></input><br>'+
               '<span>Codice avviamento postale (CAP): </span><input type="text" id="cap" value="'+data.cap+'"></input><br>'+
               '<button ng-click="update()">Modifica</button>';
        
        angular.element(document.getElementById('editSupplier')).append($compile(html)($scope));
    }

    $scope.update = function(){

    }
}]);