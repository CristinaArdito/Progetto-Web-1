angular.module('myApp.controllers')
.controller('productsController', function($scope, $sce) {
    
    
    
    var prodotti = "";

    for (i = 0; i < 5; i++) {
            prodotti = prodotti + "<ul><li>Nome prodotto: Prodotto "+i+"</li>"+
                                    "<li>Descrizione: Descrizione prodotto "+i+"</li>"+
                                    "<li>Prezzo prodotto: Prezzo prodotto "+i+"</li>"+
                                    "<li>Quantità rimanente: Quantità rimanente prodotto "+i+"</li>"+
                                    "</ul><br>";
        }



        $scope.showProdotti = $sce.trustAsHtml(prodotti);

});