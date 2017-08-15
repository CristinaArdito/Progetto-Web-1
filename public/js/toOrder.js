angular.module('myApp.controllers')
.controller('orderController', function($scope, $sce) {
    
    
    var prodotti = "<form type='POST' ng-controller = 'orderController'>";

    for (i = 0; i < 5; i++) {
            prodotti = prodotti + "<div class='productable'><ul><li>Nome prodotto: Prodotto "+i+"</li>"+
                                    "<li>Prezzo prodotto: Prezzo prodotto "+i+"</li>"+
                                    "<li>Quantità rimanente: Quantità rimanente prodotto "+i+"</li>"+
                                    "</ul></div><div class='ord'><a class='reorders' href='#!/orders'>Riordina: </a>"+
                                    "<input class='num' type='number' min='0'></input></div>";
        }
        
        prodotti = prodotti + "<br><button type='submit' class='ord' ng-click = 'ordinaProdotto()'>Ordina</button></form>";

        console.log("sono entrato in orderController");
        console.log(prodotti);

        $scope.orders = $sce.trustAsHtml(prodotti);


        $scope.ordinaProdotto = function()
        {
                console.log("orderProducts()");
                console.log($scope);
        }
});