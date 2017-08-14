angular.module('myApp.controllers')
.controller('orderController', function($scope, $sce) {
    
    
    var prodotti = "<form type='POST'>";

    for (i = 0; i < 5; i++) {
            prodotti = prodotti + "<ul><li>Nome prodotto: Prodotto "+i+"</li>"+
                                    "<li>Descrizione: Descrizione prodotto "+i+"</li>"+
                                    "<li>Prezzo prodotto: Prezzo prodotto "+i+"</li>"+
                                    "<li>Quantità rimanente: Quantità rimanente prodotto "+i+"</li>"+
                                    "<li><input type='text'></input>"+
                                    "</ul><br>";
        }
        
        prodotti = prodotti + "<button type='submit' ng-click='orderProducts()'>Ordina</input></form>";

        console.log(prodotti);

        $scope.orders = $sce.trustAsHtml(prodotti);

});