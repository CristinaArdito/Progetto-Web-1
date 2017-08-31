angular.module('myApp.controllers')
.controller('productsController', ['$scope', '$compile', '$http' , '$location' ,'DataService','ProductsHandleService',
function($scope, $compile, $http, $location, DataService, ProductsHandleService) {
    
    
    $scope.showCategories = function(){

        var data = ['Tutti', 'Hardware',"Software","Pc-Workstation","Pc-preconfigurati","Notebook",
                    "Smartphone","Tablet","Monitor","Gaming", "Periferiche","Cavetteria",
                    "Fax","Televisori","Stampanti-Plotter","Multifunzione-Copiatrici",
                    "Cd-Dvd", "Scanner", "Server", "Memorie-Pendrive", "Audio", "Networking",
                    "Ebook-readers", "Droni"];
        
        var html = '<div class="title" >&nbsp;Categorie </div><ul>';
        var param = "";

        for(i=0;i<data.length;i++){
            if(data[i] == "Tutti"){
                html = html+"<li><a ng-click='showProducts(0)'>&nbsp; &#x21AA;<span id='catId'>"+data[i]+"</span></a></li><hr>";
            }else{
                param = "showProducts('"+data[i]+"')";
                html = html+"<li><a ng-click="+param+">&nbsp; &#x21AA; "+data[i]+"</a></li><hr>";
            }
        }

        html = html + "<ul>";

        angular.element(document.getElementById('categoryForm')).append($compile(html)($scope));
    }

    $scope.Delete = function(){
        angular.element(document.getElementById('productForm')).empty();
    }

    $scope.showProducts = function(data){
        console.log(data);
        if(data == 0){
            this.Delete();
            ProductsHandleService.getAllProducts()
            .then(function(value){    
                console.log(value);
                
                var prodotti = "";
                var nNome = ""

                console.log("Stampa prodotti");

                for (i = 0; i < value.length; i++) {

                        nParam = 'redirectToOrder("'+i+'");';
                        prodotti = prodotti + "<div class='product'><h2><span id='nNome"+i+"'>"+value[i].name+"</span></h2>"+
                                                "<ul><li>Img : "+i+"</li>"+
                                                "<li>Prezzo : <span id='nPrice"+i+"'>"+value[i].price+"</span></li>"+
                                                "<li>Categoria: <span>"+value[i].name+"</span></li>"+
                                                "<li>Quantità rimanente: <span id='nQuantity"+i+"'>"+value[i].quantity+"</span></li>"+
                                                "<li><button class='btn' ng-click='"+nParam+"'>Riordina</button></li>"+
                                                "</ul></div>";
                    }

                    angular.element(document.getElementById('productForm')).append($compile(prodotti)($scope));
            });
        }else{
            console.log("Categories");
            this.Delete();
            ProductsHandleService.getCategory(data)
            .then(function(value){    
                console.log(value);
                
                value = value.data;
                var prodotti = "";
                var nNome = ""


                if(value.length == 0){
                    prodotti = "<div class='noproduct'><span>Nessun prodotto nella categoria: "+data+"</span></div>"
                    angular.element(document.getElementById('productForm')).append($compile(prodotti)($scope));
                }else{
                    for (i = 0; i < value.length; i++) {

                            nParam = 'redirectToOrder("'+i+'");';
                            prodotti = prodotti + "<div class='product'><h2><span id='nNome"+i+"'>"+value[i].name+"</span></h2>"+
                                                    "<ul><li>Img : "+i+"</li>"+
                                                    "<li>Prezzo : <span id='nPrice"+i+"'>"+value[i].price+"</span></li>"+
                                                    "<li>Categoria: <span>"+value[i].name+"</span></li>"+
                                                    "<li>Quantità rimanente: <span id='nQuantity"+i+"'>"+value[i].quantity+"</span></li>"+
                                                    "<li><button class='btn' ng-click='"+nParam+"'>Riordina</button></li>"+
                                                    "</ul></div>";
                        }

                        angular.element(document.getElementById('productForm')).append($compile(prodotti)($scope));
                }
            });
        }
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
}])
.controller('addProductController', ['$scope', 'ProductsHandleService','FileUpload','DataService', 
function($scope, ProductsHandleService, FileUpload, DataService){


    $scope.loadFile = function(){
        var file = angular.element(document.getElementById("img"))[0].files[0];
        if(file.size>2097152) alert("File troppo grande, dimensione massima 2MB");
        else FileUpload.fileReader(file);
    }

    $scope.addProduct = function($scope){
        var data = [];
        var flag = false;

        data[0] = angular.element(document.getElementById("name"))[0].value;
        data[1] = angular.element(document.getElementById("code"))[0].value;
        data[2] = angular.element(document.getElementById("cat"))[0].value;
        if(data[2].includes(",") == false) data[2] = data[2]+",";
        data[3] = angular.element(document.getElementById("peso"))[0].value;
        data[4] = angular.element(document.getElementById("price"))[0].value;
        data[5] = angular.element(document.getElementById("q"))[0].value;
        data[6] = angular.element(document.getElementById("img"))[0].files[0];
        data[7] = angular.element(document.getElementById("desc"))[0].value;
        
        ProductsHandleService.storeImage(DataService.get_nonreset())
        .then(function(urlValue){
            data[6] = urlValue.data.urlName;
            for(i=0;i<data.length;i++){
                if(data[i] == ""){
                    alert("Dati non completi");
                    flag = true;
                    break;
                }
            }
            
            if(flag == false){
                ProductsHandleService.addProduct(data);
            }
        });
    }
}])
.controller('singleController', ['$scope', function($scope) {
}]);