angular.module('myApp.controllers')
.controller('productsController', ['$scope', '$compile', '$http' , '$location' ,'DataService','ProductsHandleService',
function($scope, $compile, $http, $location, DataService, ProductsHandleService) {
    
    
    $scope.showProducts = function(){

    // Data sarà poi il risultato del servizio di fetch dei prodotti
    var data = [{'name':"scheda video", 'price':"€ 249,90", 'quantity':"4", 'category':"hardware"}, {'name':"scheda madre", 'price':"€ 128,90", 'quantity':"3", 'category':"hardware"}];

    var prodotti = "";
    var nNome = ""
    for (i = 0; i < data.length; i++) {
            nParam = 'redirectToOrder("'+i+'");';
            prodotti = prodotti + "<div class='product'><h2><span id='nNome"+i+"'>"+data[i].name+"</span></h2>"+
                                    "<ul><li>Img : "+i+"</li>"+
                                    "<li>Prezzo : <span id='nPrice"+i+"'>"+data[i].price+"</span></li>"+
                                    "<li>Categoria: <span>"+data[i].category+"</span></li>"+
                                    "<li>Quantità rimanente: <span id='nQuantity"+i+"'>"+data[i].quantity+"</span></li>"+
                                    "<li><button class='btn' ng-click='"+nParam+"'>Riordina</button></li>"+
                                    "</ul></div>";
        }

        angular.element(document.getElementById('productForm')).append($compile(prodotti)($scope));
        }

   $scope.redirectToOrder = function(n){

       var param = [];
       console.log("nName"+n);
       param[0] = angular.element(document.getElementById("nNome"+n))[0].innerHTML;
       param[1] = angular.element(document.getElementById("nPrice"+n))[0].innerHTML;
       param[2] = angular.element(document.getElementById("nQuantity"+n))[0].innerHTML;
       console.log(param);
       $location.path("/orders");
       DataService.set(JSON.stringify(param));
   }


   $scope.callOnEnter = function(event) {
    if (event.keyCode === 13) {
      $scope.searchProducts();
    }
   }

   $scope.searchProducts = function(){
       var search = angular.element(document.getElementById("searchBox"))[0].value;
       ProductsHandleService.getSingleProduct(search);
   }
}]);