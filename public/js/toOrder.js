angular.module('myApp.controllers')
.controller('orderController', [ '$scope', '$compile', '$http', '$location', 'DataService', 'ProductsHandleService',
        function($scope, $compile, $http, $location, DataService, ProductsHandleService) {
    
    $scope.showOrders = function(){
        var data = DataService.get();
        if(data != null){
            showSingleOrder(JSON.parse(data));
        }else{
        
        ProductsHandleService.getAllProducts()
        .then(function(value){
            var prodotti = "";
            var n = 5;
    
                for (i = 0; i < value.length; i++) {
                        prodotti = prodotti + "<div class='orderproduct'><ul>"+
                                                "<li>Nome prodotto: <span id='nProd"+i+"'>"+value[i].name+"</span></li>"+
                                                "<li>Prezzo prodotto:"+value[i].price+"</li>"+
                                                "<li>Quantità rimanente:"+value[i].quantity+"</li>"+
                                                "</ul></div><div class='ord'><a class='reorders' href='#!/orders'>Riordina: </a>"+
                                                "<input name='prodotto"+i+"' class='num' type='number' min='0' value='0'></input></div><br>";
                    }
                    
                    prodotti = prodotti + "<br><button type='submit' class='ordbutton' ng-click = 'ordinaProdotto()'>Ordina</button>";
    
            angular.element(document.getElementById('orderForm')).append($compile(prodotti)($scope));
        });
        }
    }

    showSingleOrder = function(data){

        var prodotti = "";
        var i=0;
        var numProd = 'ordinaProdotto("'+i+'")';

        prodotti = prodotti + "<div class='orderproduct'><ul><li>Nome prodotto: <span id='nProd"+i+"'>"+data[0]+"</span></li>"+
                                            "<li>Prezzo prodotto: "+data[1]+"</li>"+
                                            "<li>Quantità rimanente: "+data[2]+"</li>"+
                                            "</ul></div><div class='ord'><a class='reorders' href='#!/orders'>Riordina: </a>"+
                                            "<input name='prodotto"+i+"' class='num' type='number' min='0' value='0'></input></div><br>";
                
        prodotti = prodotti + "<br><button type='submit' class='ordbutton' ng-click = '"+numProd+"'>Ordina</button>";

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
       $location.path("/orderSuccess");
       $http.post("api/product/orders", {
            'data' : JSON.stringify(data)
       });
    }
}
]
)
.controller('orderSuccessController', ['$scope' , function($scope){
    console.log("entro in orderSuccessController");
}]);;
