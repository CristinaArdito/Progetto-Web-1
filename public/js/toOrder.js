angular.module('myApp.controllers')
.controller('orderController', [ '$scope', '$compile', '$http', '$location', 'DataService', 'ProductsHandleService',
        function($scope, $compile, $http, $location, DataService, ProductsHandleService) {
    

    //=======================================================================================
    //Pager per creazione pagine
    $scope.showPager = function(index){
        
        console.log("pager");
        var total = DataService.get_nonreset().length;
        var pages = Math.ceil(total/6);

        html = "<div class='topbuttonord'><button id='prev' ng-click='Previous("+index+")'>◀</button>";

        for(i=0;i<pages;i++){
            if(i==index){
                html += "<button style='color: #bbdefb;' ng-click='showPage("+(i*6)+")'>"+(i+1)+"</button>";
            }else html += "<button ng-click='showPage("+(i*6)+")'>"+(i+1)+"</button>";
        }

        html += "<button id='succ' ng-click='Succesive("+index+")'>▶</button></div>";

        angular.element(document.getElementById('orderForm')).append($compile(html)($scope));
   
    }

    $scope.showPage = function(n){
        
        angular.element(document.getElementById('orderForm')).empty();
        $scope.showOrder(DataService.get_nonreset(),n,(n+6));
        $scope.showPager((n/6));
    }

    $scope.Previous = function(index){
        if(index > 0){
            $scope.showPage((index-1)*6);
        }
    }

    $scope.Succesive = function(index){
        if(((index+1)*6) < DataService.get_nonreset().length){
            $scope.showPage((index+1)*6);
        }
    }
    
    $scope.showOrder = function(value,x,y){
        var prodotti = "";
        var n = 5;

            for (i = x; i < y; i++) {

                if(i>= value.length) break;

                prodotti = prodotti + "<div class='orderproduct'><ul>"+
                                      "<li>Nome prodotto: <span id='nProd"+i+"'>"+value[i].name+"</span></li>"+
                                      "<li>Codice:  <span id='nCod"+i+"'>"+value[i].code+"</span>"+
                                      "<li>Prezzo prodotto:"+value[i].price+"</li>"+
                                      "<li>Quantità rimanente: <span id='nQ"+i+"'>"+value[i].quantity+"</li>"+
                                      "</ul></div><div class='ord'><a class='reorders' href='#!/orders'>Riordina: </a>"+
                                      "<input id='prodotto"+i+"' class='num' type='number' min='0' value='0'></input></div><br>";
            }
        prodotti = prodotti + "<br><button type='submit' class='ordbutton' ng-click = 'ordinaProdotto()'>Ordina</button>";

        angular.element(document.getElementById('orderForm')).append($compile(prodotti)($scope));
    }
    //=======================================================================================

    $scope.showOrders = function(){
        var data = DataService.get_nonreset();
        if(data != null){
            showSingleOrder(JSON.parse(data));
        }else{
        
        ProductsHandleService.getAllProducts()
        .then(function(value){
            DataService.set(value);
            $scope.showOrder(value,0,6);
            $scope.showPager(0);
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
       m = [];
       var code, quantity;

       for(i=0;i<6;i++){
          code = angular.element(document.getElementById('nCod'+i));
          if(code == undefined) break;
          q1 = angular.element(document.getElementById('prodotto'+i))[0].value;

          if(parseInt(q1) > 0){
            m.push(code[0].innerHTML,parseInt(q1));
          }
       }
    }      
}])
.controller('orderSuccessController', ['$scope' , function($scope){
    console.log("entro in orderSuccessController");
}]);;
