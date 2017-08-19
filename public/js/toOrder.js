angular.module('myApp.controllers')
.controller('orderController', [ '$scope', '$compile', '$http', '$location', 'DataService',
        function($scope, $compile, $http, $location, DataService) {
    
    $scope.showOrders = function(){
        console.log("entro in showOrders");
        var data = DataService.get();
        if(data != null){
            showSingleOrder(data);
        }else{

        //Bisogna ridefinire la funzione getAllProducts dentro productsHandling
        var prodotti = "";
        var n = 5;

            for (i = 0; i < n; i++) {
                    prodotti = prodotti + "<div class='orderproduct'><ul><li>Nome prodotto: <span id='nProd"+i+"'>Prodotto "+i+"</span></li>"+
                                            "<li>Prezzo prodotto: Prezzo prodotto "+i+"</li>"+
                                            "<li>Quantità rimanente: Quantità rimanente prodotto "+i+"</li>"+
                                            "</ul></div><div class='ord'><a class='reorders' href='#!/orders'>Riordina: </a>"+
                                            "<input name='prodotto"+i+"' class='num' type='number' min='0' value='0'></input></div><br>";
                }
                
                prodotti = prodotti + "<br><button type='submit' class='ordbutton' ng-click = 'ordinaProdotto()'>Ordina</button>";
                console.log(prodotti);

        angular.element(document.getElementById('orderForm')).append($compile(prodotti)($scope));
        }
    }

    showSingleOrder = function(data){

        var prodotti = "";
        var i=0;
        var numProd = 'ordinaProdotto("'+i+'")';

        prodotti = prodotti + "<div class='orderproduct'><ul><li>Nome prodotto: <span id='nProd"+i+"'>"+data+"</span></li>"+
                                            "<li>Prezzo prodotto: Prezzo "+data+"</li>"+
                                            "<li>Quantità rimanente: Quantità rimanente "+data+"</li>"+
                                            "</ul></div><div class='ord'><a class='reorders' href='#!/orders'>Riordina: </a>"+
                                            "<input name='prodotto"+i+"' class='num' type='number' min='0' value='0'></input></div><br>";
                
        prodotti = prodotti + "<br><button type='submit' class='ordbutton' ng-click = '"+numProd+"'>Ordina</button>";
        // console.log(prodotti);

        angular.element(document.getElementById('orderForm')).append($compile(prodotti)($scope));
    }
   
    $scope.ordinaProdotto = function()
    {
       var c1 = [];
       var c2 = [];
       var l1;
       var k=0;
       var i=0;
       var nome = "prodotto"+i;
       var nNome = "";

       do{
        nome = "prodotto"+i;
        nNome = "nProd"+i;
        l1 = angular.element(document.getElementsByName(nome));
        if(l1[0] == undefined) break;
        else l1 = l1[0].value;
        if(l1 != '0'){
            c1[k] = l1;
            c2[k] = angular.element(document.getElementById(nNome))[0].innerHTML;
            k++;
        }
        i++;
        
       }while(angular.element(document.getElementsByName(nome)) != undefined != '0' != 0);

       data = [c1,c2];
       console.log(data);
       $location.path("/orderSuccess");
       $http.post("api/product/orders", {
            'data' : JSON.stringify(data)
       });
    }
}
]
);