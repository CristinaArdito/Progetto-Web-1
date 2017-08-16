angular.module('myApp.controllers')
.controller('orderController', 
        function($scope, $compile, $http) {

    $scope.showOrders = function(){
        console.log("entro in showOrders");

        //Bisogna ridefinire la funzione getAllProducts dentro productsHandling
        var prodotti = "";
        
            for (i = 0; i < 5; i++) {
                    prodotti = prodotti + "<div class='productable'><ul><li>Nome prodotto: Prodotto "+i+"</li>"+
                                            "<li>Prezzo prodotto: Prezzo prodotto "+i+"</li>"+
                                            "<li>Quantità rimanente: Quantità rimanente prodotto "+i+"</li>"+
                                            "</ul></div><div class='ord'><a class='reorders' href='#!/orders'>Riordina: </a>"+
                                            "<input name='prodotto"+i+"' class='num' type='number' min='0'></input></div><br>";
                }
                
                prodotti = prodotti + "<br><button type='submit' class='ord' ng-click = 'ordinaProdotto()'>Ordina</button>";
                console.log(prodotti);

        angular.element(document.getElementById('orderForm')).append($compile(prodotti)($scope));
    }
   
    $scope.ordinaProdotto = function()
    {
       $http.post("/api/orders");
    }
}
);