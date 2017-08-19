angular.module('myApp.controllers')
.controller('productsController', ['$scope', '$compile', '$http' , '$location' ,'DataService' ,
function($scope, $compile, $http, $location, DataService) {
    
    
    $scope.showProducts = function(){
    var prodotti = "";
    var nNome = ""
    for (i = 0; i < 5; i++) {
            nParam = 'redirectToOrder("nNome'+i+'");';
            prodotti = prodotti + "<div class='product'><h2>Nome: <span id='nNome"+i+"'>Prodotto "+i+"</span></h2>"+
                                    "<ul><li>Img : "+i+"</li>"+
                                    "<li>Prezzo : "+i+"</li>"+
                                    "<li>Quantità rimanente: "+i+"</li>"+
                                    "<li><button class='btn' ng-click='"+nParam+"'>Riordina</button></li>"+
                                    "</ul></div>";
        }

        angular.element(document.getElementById('productForm')).append($compile(prodotti)($scope));
        }

   $scope.redirectToOrder = function(name){

       var param = angular.element(document.getElementById(name))[0].innerHTML;
       console.log(param);
       $location.path("/orders");
       DataService.set(param);
   }
}]);