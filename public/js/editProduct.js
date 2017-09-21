angular.module('myApp.controllers')
.controller('editProductController', ['$scope', '$compile', '$http' , '$location' ,'DataService','ProductsHandleService',
function($scope, $compile, $http, $location, DataService, ProductsHandleService) {
    

    $scope.init = function(){

        ProductsHandleService.getSingleProduct(DataService.get())
        .then(function(value){

            data = value.data;

            part1 = '<span>Nome prodotto: </span><input type="text" id="name" value="'+data.name+'"></input><br>'+
            '<span>Categoria prodotto: </span>';

            part1 = part1 + angular.element(document.getElementById('addProducts'))[0].innerHTML;

            angular.element(document.getElementById('addProducts')).empty();

            part1 = part1 + '<span>Peso prodotto: </span><input type="text" id="peso" value="'+data.weight+'"></input><br>'+
                            '<span>Prezzo prodotto: </span><input type="text" id="price" value="'+data.price+'"></input><br>'+
                            '<span>Immagine prodotto (Dimensione massima 2MB): </span><input type="file" name="pic" accept=".png, .jpg"  id="img"></input>'+
                            '<input type="submit" ng-click="loadFile()" value="Carica file"></input><br>'+
                            '<span class="desc">Descrizione prodotto: </span><textarea id="desc" rows="4" cols="50" >'+data.desc+'</textarea><br>'+
                            '<button ng-click="modify()">Modifica prodotto</button>';
            
            angular.element(document.getElementById('addProducts')).append($compile(part1)($scope));
            angular.element(document.getElementById('selectionForm'))[0].value = data.categories[0];
        })
        
        
    }

    
/*
    
        */
}])
