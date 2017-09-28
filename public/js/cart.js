angular.module('myApp.controllers')
.controller('cartController', ['$scope', '$compile', 'CartStorage', 'DataService', 'ProductsHandleService', 'CurrentUserService', 'OrderService',
function($scope, $compile, CartStorage, DataService, ProductsHandleService, CurrentUserService, OrderService) {

    $scope.getCart = function(){
        var prodotti = "";
        var remove = "";
        var somma = 0;

        angular.element(document.getElementById('checkoutForm')).empty();

        if(CartStorage.isEmpty() == true){

            prodotti = "<div class='noproduct'>Nessun prodotto nel carrello</div>"
            angular.element(document.getElementById('showProduct')).append($compile(prodotti)($scope));
            angular.element(document.getElementById('showBill')).empty();
            $scope.subtotal = 0;
            $scope.tax = 0;
            $scope.total = 0;
        }
        else{
        var data = CartStorage.get();

        console.log("Carrello");
        console.log(data);

        

            for(i=0;i<data.length;i++){
                remove = "remove('"+i+"')";
                if(data[i][2].includes(",")) data[i][2] = data[i][2].replace(",",".");
                adjustPrice = "adjustPrice('"+i+"')";
                url = "'"+data[i][4]+"'";

                prodotti = prodotti + '<div id="prodotto'+i+'">'+
                '<div class="img" style="background: url('+url+') no-repeat;position: relative; margin-left: 5%;'+
                'margin-top: 1%; max-width: 6%; height: 115px; background-size: 100%;"></div><div class="nomeprod">'+data[i][0]+'</div>'+
                '<div class="prezzoprod">&euro; <span id="price'+i+'">'+data[i][2]+'</span></div>'+
                '<div class="buttoncontainer"><button type="submit" id="submitbutton" ng-click="'+remove+'">Elimina</button></div>'+
                '<div class="qtacart"><input type="number" min="1" value="'+data[i][3]+'" id="q'+i+'" ng-click="'+adjustPrice+'"></input></div>'+
                '<div class="tot" >&euro;<span id="grantotatalPrice'+i+'">'+(parseFloat(data[i][2])*parseInt(data[i][3]))+'</span></div></div><br><br><br>';

                
                somma = somma + parseFloat(data[i][2])*parseInt(data[i][3]);
            }

            angular.element(document.getElementById('showProduct')).append($compile(prodotti)($scope));
            $scope.subtotal = somma;
            $scope.tax = somma*0.22;
            $scope.total = (somma*1.22)+8;
        }
    }

    $scope.adjustPrice = function(number){

        var newSomma = parseFloat(angular.element(document.getElementById(('price'+number)))[0].innerHTML);
        var q = parseInt(angular.element(document.getElementById(('q'+number)))[0].value);
        var total = parseFloat(angular.element(document.getElementById(('grantotatalPrice'+number)))[0].innerHTML);

        var partialSum = $scope.subtotal - total;
        
        newSomma = newSomma*q;

        $scope.subtotal = partialSum+newSomma;
        $scope.tax = (partialSum+newSomma)*0.22;
        $scope.total = ((partialSum+newSomma)*1.22)+8;

        angular.element(document.getElementById(('grantotatalPrice'+number))).empty();
        angular.element(document.getElementById(('grantotatalPrice'+number))).append(newSomma.toFixed(2));
        CartStorage.setQuantity(number,q);
         
    }

    $scope.remove = function(nome){

        angular.element(document.getElementById(('prodotto'+nome))).empty();
        angular.element(document.getElementById('showProduct')).empty();
        CartStorage.remove(parseInt(nome));
        this.getCart();
    }

    $scope.getQuantityForCheckOut = function(){

        var data = CartStorage.get();
        
        DataService.reset();

        for(i=0;i<data.length;i++){
            ProductsHandleService.getSingleProduct(data[i][0])
            .then(function(data){
                data = data.data;

                DataService.add(data);
            })
        }
    }

    $scope.checkOut = function(){

        if(CurrentUserService.isLogged() == true){

            html = '<div class="contcheckout"><h4>Indirizzo di consegna</h4>'+
                '<div class="inputcheck">Via: <input type="text"></input></div>'+
                '<div class="inputcheck">Città: <input type="text"></input></div>'+
                '<div class="capcheck">CAP: <input type="text"></input></div>'+
                '<button type="submit" ng-click="buy()">Acquista</button></div>';
            
            angular.element(document.getElementById('checkoutForm')).empty();
            angular.element(document.getElementById('checkoutForm')).append($compile(html)($scope));
        }else{
            alert("Devi essere autenticato per poter acquistare i nostri prodotti");
        }
    }

    $scope.buy = function(){

        var data = CartStorage.get();
        var q = DataService.get_nonreset();
        var flag = true;
        var codes = [];
        var quantity = [];

        dataTime = new Date();
        dataTime = ""+dataTime.getDate() + '/' + (dataTime.getMonth() + 1) + '/' +  dataTime.getFullYear();

        for(i=0;i<data.length;i++){
            if(q[i].quantity < data[i][3]){
                flag = false;
                alert("Il prodotto "+data[i][0]+" non è più disponibile nella quantità richiesta.\nDisponibilità: "+q[i].quantity);
                break;
            }
        }

        for(i=0;i<data.length;i++){
            codes[i] = data[i][5];
            quantity[i] = data[i][3];
        }


        if(flag == true){
            OrderService.userOrder(codes,quantity,dataTime,CurrentUserService.getSelf())
            .then(function(response){
                console.log("Modifica prodotti");
                    for(i=0;i<codes.length;i++){
                        ProductsHandleService.setQuantity(codes[i], q[i].quantity-quantity[i]);
                    }
            })

            console.log("Yeee");
        }else{
            console.log("Non disponibile");
        }

    }
}]);