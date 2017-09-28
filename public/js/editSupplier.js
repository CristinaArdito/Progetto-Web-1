angular.module('myApp.controllers')
.controller('editSupplierController', ['$scope', '$compile', '$http' , '$location' ,'DataService', 'SupplierService',
function($scope, $compile, $http, $location, DataService, SupplierService) {
    

    $scope.init = function(){

        var data = DataService.get();

        html = '<div id="addSupplier"><span>Nome fornitore: </span><input type="text" id="name" value="'+data.name+'"></input><br>'+
               '<span id="oldmail" hidden="true">'+data.email+'</span>'+
               '<span>Nuova Email: </span><input type="text" id="email"></input><br>'+
               '<span>Numero di Telefono: </span><input type="text" id="tel" value="'+data.ntel+'"></input><br>'+
               '<span>Via: </span><input type="text" id="via" value="'+data.via+'"></input><br>'+
               '<span>Città: </span><input type="text" id="city" value="'+data.city+'"></input><br>'+
               '<span>Codice avviamento postale (CAP): </span><input type="text" id="cap" value="'+data.cap+'"></input><br>'+
               '<button ng-click="update()">Modifica</button></div>';
        
        angular.element(document.getElementById('editSupplier')).append($compile(html)($scope));
    }

    $scope.update = function(){

        var data = [];

        data['name'] = angular.element(document.getElementById('name'))[0].value;
        data['emailp'] = angular.element(document.getElementById('oldmail'))[0].innerHTML;
        data['email'] = angular.element(document.getElementById('email'))[0].value;
        if(data['email'] == ""){
            data['email'] = data['emailp'];
        }
        data['ntel'] = angular.element(document.getElementById('tel'))[0].value;
        data['via'] = angular.element(document.getElementById('via'))[0].value;
        data['city'] = angular.element(document.getElementById('city'))[0].value;
        data['cap'] = angular.element(document.getElementById('cap'))[0].value;

        SupplierService.updateSupplier(data)
        .then(function(result){
            $location.path("/supplier");
        })
        .catch(function(result){
            $location.path("/supplier");
        });
    }
}]);