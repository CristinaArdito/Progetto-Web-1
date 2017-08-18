angular.module('myApp.controllers')
.controller('productsController', function($scope, $compile, $http) {
    
    
    $scope.showProducts = function(){
    var prodotti = "";

    for (i = 0; i < 5; i++) {
            prodotti = prodotti + "<div class='product'><h2>Nome: <span id='nNome'>Prodotto "+i+"</span></h2>"+
                                    "<ul><li>Img : "+i+"</li>"+
                                    "<li>Prezzo : "+i+"</li>"+
                                    "<li>Quantità rimanente: "+i+"</li>"+
                                    "<li><button class='btn' ng-click='redirectToOrder()'>Riordina</button></li>"+
                                    "</ul></div>";
        }
        //console.log(prodotti);

        angular.element(document.getElementById('productForm')).append($compile(prodotti)($scope));
        }

   $scope.redirectToOrder = function(){

       var param = angular.element(document.getElementById('nNome'))[0].innerText;
       console.log(param);
       $http.post("api/product/specOrders", { 'name' : param});
   }
});