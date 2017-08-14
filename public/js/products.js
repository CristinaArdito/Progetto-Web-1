angular.module('myApp.controllers')
.controller('productsController', function($scope, $sce) {
    
    
    
    var prodotti = "";

    for (i = 0; i < 5; i++) {
            prodotti = prodotti + "<div class="+"productable"+"><ul><li>Nome prodotto: Prodotto "+i+"</li>"+
                                    "<li>Prezzo prodotto: Prezzo prodotto "+i+"</li>"+
                                    "<li>Quantità rimanente: Quantità rimanente prodotto "+i+"</li>"+
                                    "</ul></div><div class="+"ord"+"><a class="+"reorders"+"href="+"#!/orders"+">Riordina: </a>"+
                                    "<input class="+"num"+" type="+"number"+" min="+"0"+"></div><br>";
        }

        console.log(prodotti);

        $scope.showProdotti = $sce.trustAsHtml(prodotti);

});