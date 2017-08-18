angular.module('myApp.controllers')
.controller('orderController', 
        function($scope, $compile, $http) {
    
    var n = 5;
    
    $scope.showOrders = function(){
        console.log("entro in showOrders");

        //Bisogna ridefinire la funzione getAllProducts dentro productsHandling
        var prodotti = "";
        
            for (i = 0; i < n; i++) {
                    prodotti = prodotti + "<div class='orderproduct'><ul><li>Nome prodotto: <div id='nProd"+i+"'>Prodotto "+i+"</div></li>"+
                                            "<li>Prezzo prodotto: Prezzo prodotto "+i+"</li>"+
                                            "<li>Quantità rimanente: Quantità rimanente prodotto "+i+"</li>"+
                                            "</ul></div><div class='ord'><a class='reorders' href='#!/orders'>Riordina: </a>"+
                                            "<input name='prodotto"+i+"' class='num' type='number' min='0' value='0'></input></div><br>";
                }
                
                prodotti = prodotti + "<br><button type='submit' class='ordbutton' ng-click = 'ordinaProdotto()'>Ordina</button>";
               // console.log(prodotti);

        angular.element(document.getElementById('orderForm')).append($compile(prodotti)($scope));
    }
   
    $scope.ordinaProdotto = function()
    {
       var c1 = [];
       var c2 = [];
       var nome = "";
       var nNome = "";

       for(i=0;i<n;i++){
        nome = "prodotto"+i;
        nNome = "nProd"+i;
        c1[i] = angular.element(document.getElementsByName(nome))[0].value;
        c2[i] = angular.element(document.getElementById(nNome))[0].innerText;
       }

       data = [c1,c2];
       console.log(data);
       $http.post("api/product/orders");
    }
}
);