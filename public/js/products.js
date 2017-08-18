angular.module('myApp.controllers')
.controller('productsController', function($scope, $compile) {
    
    
    $scope.showProducts = function(){
    var prodotti = "";

    for (i = 0; i < 5; i++) {
            prodotti = prodotti + "<div class='product'><h2 id='nNome'>Nome: Prodotto "+i+"</h2>"+
                                    "<ul><li>Img : "+i+"</li>"+
                                    "<li>Prezzo : "+i+"</li>"+
                                    "<li>Quantità rimanente: "+i+"</li>"+
                                    "<li><a class='btn' ng-click='redirectToOrder()'>Riordina</a></li>"+
                                    "</ul></div>";
        }
        //console.log(prodotti);

        angular.element(document.getElementById('productForm')).append($compile(prodotti)($scope));
        }

   $scope.redirectToOrder = function(){
        console.log("funziona");
   }
});