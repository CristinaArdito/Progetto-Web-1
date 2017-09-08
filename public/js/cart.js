angular.module('myApp.controllers')
.controller('cartController', ['$scope', '$compile', 'CartStorage',
function($scope, $compile, CartStorage) {

    $scope.getCart = function(){
        var prodotti = "";
        var remove = "";
        var somma = 0;

        
        if(CartStorage.isEmpty() == true){

            prodotti = "<div style:'margin-left: 45%'>Nessun prodotto nel carrello</div>"
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
                '<div class="img" style="background: url('+url+') no-repeat;"></div><div class="nomeprod">'+data[i][0]+'</div>'+
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

    $scope.inizializza = function(){

        data = [['Samsung Galaxy s8', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit', '549,00','2'],
                ['Notebook', 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua', '456,00','1'],
                ['TV Samsung', 'Ut enim ad minim veniam, quis nostrud exercitation ullamco', '560.00', '1']];

        CartStorage.set(data);
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
        angular.element(document.getElementById(('grantotatalPrice'+number))).append(newSomma.toString());
        CartStorage.setQuantity(number,q);
         
    }

    $scope.remove = function(nome){

        angular.element(document.getElementById(('prodotto'+nome))).empty();
        angular.element(document.getElementById('showProduct')).empty();
        CartStorage.remove(parseInt(nome));
        this.getCart();
    }
}]);