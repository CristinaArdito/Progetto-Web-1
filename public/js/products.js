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


    $scope.showContent = function(value,x,y){
        
        var prodotti = "";
        for (i = x; i < y; i++) {

            if(i>=value.length) break;

            background = 'background: url("'+value[i].url+'") no-repeat;'+
                            '  background-size: 55%; margin-left: 32%;';

                nParam = 'redirectToOrder("'+i+'");';
                remove = 'removeProduct("'+value[i].code+'","'+value[i].url+'")';
                prodotti = prodotti + "<div class='product'><h2><span style='color:Black;' id='nNome"+i+"'>"+value[i].name+"</span></h2>"+
                                        "<ul><li style='"+background+"'></li>"+
                                        "<li>Prezzo : <span id='nPrice"+i+"'>"+value[i].price+"</span></li>"+
                                        "<li>Categoria: <span>"+value[i].categories[0]+"</span></li>"+
                                        "<li>Quantità rimanente: <span id='nQuantity"+i+"'>"+value[i].quantity+"</span></li>"+
                                        "<li><button class='btn' ng-click='"+nParam+"'>Riordina</button></li>"+
                                        "<li><button class='btnremove' ng-click='"+remove+"'>Rimuovi</button></li>"+
                                        "</ul></div>";
        }

        angular.element(document.getElementById('productForm')).append($compile(prodotti)($scope));
    }

    $scope.showOfferts = function(n){

        ProductsHandleService.getAllProducts()
        .then(function(data){

            var html = "";
            var x;

            DataService.set(data);

            var numbers = [];
            for(i=0;i<data.length;i++){
                numbers[i] = false;
            }

            for(i=0;i<n;i++){

               if(i>= data.length) break;
               x = Math.floor(Math.random() * data.length);
               if(numbers[x] == false){
                
                numbers[x] = true;

                background = "'"+data[x].url+"'";
                html += '<div class="product"><a ng-click="Details('+x+')">'+
                        '<div class="nome">'+data[x].name+'</div>'+
                        '<ul><li style="background: url('+background+') no-repeat;  background-size: 68%;'+
                        'height: 160px; margin-left: 25%;"></li>'+
                        '<li><div class="prezzo">&euro;'+data[x].price+'</div></li>'+
                        '</ul></a></div>';
                }else{
                    i--;
                }
            }

            angular.element(document.getElementById('vetrina')).append($compile(html)($scope));

        })
    }

    $scope.removeProduct = function(code,url){

        ProductsHandleService.removeProduct(code,url)
        .then(function(response){
            console.log(response);
        })
        .catch(function(err){
            console.log(err);
        })


    }

    //=============================================================================================
    //Pager per creazione pagine
    $scope.showPager = function(index){
        
        var total = DataService.get_nonreset().length;
        var pages = Math.ceil(total/4);

        html = "<div class='topbutton'><button id='prev' ng-click='Previous("+index+")'>◀</button>";

        for(i=0;i<pages;i++){
            if(i==index){
                html += "<button style='color: #2196f3;' ng-click='showPage("+(i*4)+")'>"+(i+1)+"</button>";
            }else html += "<button ng-click='showPage("+(i*4)+")'>"+(i+1)+"</button>";
        }

        html += "<button id='succ' ng-click='Succesive("+index+")'>▶</button></div>";

        angular.element(document.getElementById('productForm')).append($compile(html)($scope));

        
    }

    $scope.showPage = function(n){
        
        angular.element(document.getElementById('productForm')).empty();
        $scope.showContent(DataService.get_nonreset(),n,(n+4));
        $scope.showPager((n/4));
    }

    $scope.Previous = function(index){
        if(index > 0){
            $scope.showPage((index-1)*4);
        }
    }

    $scope.Succesive = function(index){
        if(((index+1)*4) < DataService.get_nonreset().length){
            $scope.showPage((index+1)*4);
        }
    }
    //=============================================================================================


    $scope.showProducts = function(data){
        if(data == 0){
            this.Delete();
            ProductsHandleService.getAllProducts()
            .then(function(value){

                DataService.set(value);
                $scope.showContent(value,0,4);
                $scope.showPager(0);
            });
        }else{
            this.Delete();
            ProductsHandleService.getCategory(data)
            .then(function(value){
                
                value = value.data;

                if(value.length == 0){
                    prodotti = "<div class='noproduct'><span>Nessun prodotto nella categoria: "+data+"</span></div>"
                    angular.element(document.getElementById('productForm')).append($compile(prodotti)($scope));
                }else{
                    DataService.set(value);
                    $scope.showContent(value,0,4);
                    $scope.showPager(0);
                }
            });
        }
    }

   $scope.redirectToOrder = function(n){

       var param = [];
       param[0] = angular.element(document.getElementById("nNome"+n))[0].innerHTML;
       param[1] = angular.element(document.getElementById("nPrice"+n))[0].innerHTML;
       param[2] = angular.element(document.getElementById("nQuantity"+n))[0].innerHTML;
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
       search = search.charAt(0).toUpperCase() + search.slice(1);
       this.Delete();
       ProductsHandleService.getSingleProduct(search)
       .then(function(value){

            value = value.data;

            if(value.length == 0){
                var message = "<div class='noproduct'><span>Nessun prodotto corrispondente a: "+search+"</span></div>";
                angular.element(document.getElementById('productForm')).append($compile(message)($scope));
            }

            $scope.showContent(value,0,4);
            $scope.showPager();
       });
    }

    $scope.Details = function(n){

        DataService.setIndice(n);
        $location.path("/singleproduct");
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
        angular.element(document.getElementById("name"))[0].value = "";
        data[0] = data[0].charAt(0).toUpperCase() + data[0].slice(1);
        data[1] = angular.element(document.getElementById("code"))[0].value;
        angular.element(document.getElementById("code"))[0].value = "";
        data[2] = angular.element(document.getElementById("selectionForm"))[0].value;
        if(data[2].includes(",") == false) data[2] = data[2]+",";
        angular.element(document.getElementById("selectionForm"))[0].value = "Hardware";
        data[3] = angular.element(document.getElementById("peso"))[0].value;
        angular.element(document.getElementById("peso"))[0].value = "";
        data[4] = angular.element(document.getElementById("price"))[0].value;
        angular.element(document.getElementById("price"))[0].value = "";
        data[5] = angular.element(document.getElementById("q"))[0].value;
        angular.element(document.getElementById("q"))[0].value = 0;
        data[6] = angular.element(document.getElementById("img"))[0].files[0];
        angular.element(document.getElementById("img"))[0].files[0] = null;
        data[7] = angular.element(document.getElementById("desc"))[0].value;
        angular.element(document.getElementById("desc"))[0].value = "";

        
        if(data[6] == null){
            alert("Dati non completi");
        }
        else
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
.controller('singleController', ['$scope', '$compile', 'DataService', 'CartStorage', function($scope, $compile, DataService, CartStorage) {

    $scope.showSingleProduct = function(){

        var indice = DataService.getIndice();
        var data = DataService.getIndex(indice);

        console.log("PRODOTTO SINGOLO");

        background = "'"+data.url+"'";
        html = '<div class="nomeprod">'+data.name+'</div>'+
               '<div class="img" style="background: url('+background+') no-repeat; margin-left: 20%; width: 20%;'+
                                       'height: 380px; margin-left: 15%; background-size: 100%;'+
                                       'position: relative"></div>'+
               '<div class="titolodesc">DESCRIZIONE: </div>'+
               '<div class="descr">'+data.desc+'</div>'+
               '<div class="titolocat">CATEGORIA: </div><div class="cat">'+data.categories[0]+'</div>'+
               '<div class="titolopeso">PESO: </div> <div class="peso">'+data.weight+'</div>'+
               '<div class="titoloprez">PREZZO: </div><div class="prezzoprod">&euro;'+data.price+'</div>';
               if(data.quantity > 0)
                    html += '<div class="titoloprez">QUANTIT&#193;: </div><div class="prezzoprod">'+data.quantity+'</div>'+
                            '<div class="addtitolo">Aggiungi al carrello:</div>'+
                            '<div class="addproduct"><input id="addproduct" class="inputprod" type="number" min="1" value="1"></input></div>'+
                            '<div class="but"><button type="submit" id="submitbutton" class="idbutton" ng-click="addToCart('+indice+')"></button></div>'
               else html += '<div class="addtitolo">Aggiungi al carrello:</div>'+
                            '<div class="addproduct">'+
                            '<input id="addproduct" class="inputprod" type="number" min="1" value="1"></input></div>'+
                            '<div class="but"><button type="submit" id="submitbutton" class="idbutton"></button></div>'+
                            '<div class="iconavv"></div><div class="avviso">Avvisami quando ritornerà disponibile</div>';

               angular.element(document.getElementById('signleProduct')).append($compile(html)($scope));
    }

    $scope.addToCart = function(index){
        
        var item = DataService.getIndex(index);
        n = angular.element(document.getElementById('addproduct'))[0].value;
        var toLoad = [item.name,item.desc,item.price,n];

        console.log(index);
        console.log(toLoad);

        //if(CartStorage.isEmpty()) CartStorage.set(toLoad);
        //else 
            CartStorage.add(toLoad);
        CartStorage.setQuantity(n);
    }
}])
.controller('categoryController', ['$scope', '$compile', 'DataService','ProductsHandleService','$location', 
function($scope, $compile, DataService, ProductsHandleService, $location) {

    
    //=============================================================================================
    //Pager per creazione pagine
    $scope.showPager = function(index){
        
        var total = DataService.get_nonreset().length;
        var pages = Math.ceil(total/10);

        html = "<div class='topbutton'><button id='prev' ng-click='Previous("+index+")'>◀</button>";

        for(i=0;i<pages;i++){
            if(i==index){
                html += "<button style='color: #1976d2;' ng-click='showPage("+(i*10)+")'>"+(i+1)+"</button>";
            }else html += "<button ng-click='showPage("+(i*10)+")'>"+(i+1)+"</button>";
        }

        html += "<button id='succ' ng-click='Succesive("+index+")'>▶</button></div>";

        angular.element(document.getElementById('showCat')).append($compile(html)($scope));

        
    }

    $scope.showPage = function(n){
        
        angular.element(document.getElementById('showCat')).empty();
        $scope.showContent(DataService.get_nonreset(),n,(n+10));
        $scope.showPager((n/10));
    }

    $scope.Previous = function(index){
        if(index > 0){
            $scope.showPage((index-1)*10);
        }
    }

    $scope.Succesive = function(index){
        if(((index+1)*10) < DataService.get_nonreset().length){
            $scope.showPage((index+1)*10);
        }
    }
    //============================================================================================
    $scope.showCategoriesList = function(){
        
                var data = ['Hardware',"Software","Pc-Workstation","Pc-preconfigurati","Notebook",
                            "Smartphone","Tablet","Monitor","Gaming", "Periferiche","Cavetteria",
                            "Fax","Televisori","Stampanti-Plotter","Multifunzione-Copiatrici",
                            "Cd-Dvd", "Scanner", "Server", "Memorie-Pendrive", "Audio", "Networking",
                            "Ebook-readers", "Droni"];
                
                var html = '<div class="title" >&nbsp;Categorie </div><ul>';
                var param = "";
        
                for(i=0;i<data.length;i++){

                        param = 'showCategories("'+data[i]+'")';
                        html = html+"<li><a href ng-click="+param+">&nbsp; &#x21AA; "+data[i]+"</a></li><hr>";
                    
                }
        
                html = html + "<ul>";
        
                angular.element(document.getElementById('categoryShowList')).append($compile(html)($scope));
            }

    $scope.showContent = function(value,x,y){
        
        html = "";

        if(value.length == 0){
            html = "<div class='noproduct'><span>Nessun prodotto disponibile in questa categoria</span></div>"
        }else{
            for(i=x;i<y;i++){

                if(i>=value.length) break;

            background = 'background: url("'+value[i].url+'") no-repeat;'+
                         'background-size: 10%; height: 120px; margin-left: 3%; margin-top: 0.8%;';
                html += '<div class="productcat" ng-click="showSingleProduct('+i+')">'+
                        "<div class='img' style='"+background+"'></div>"+
                        '<div class="nome"><h3>'+value[i].name+'</h3></div>'+
                        '<div class="descr">'+value[i].desc+'</div>'+
                        '<div class="prezzoprod">&euro;'+value[i].price+'</div>';
                if(value[i].quantity > 0){
                    html += '<div class="disp">Disponibile</div></div>';
                }else{
                    html += '<div class="nodisp">Non disponibile</div></div>';
                }
            }
        }   
        angular.element(document.getElementById('showCat')).append($compile(html)($scope));
    }

    $scope.showSingleProduct = function(data){
        DataService.setIndice(data);
        $location.path('/singleproduct');
    }

    $scope.showCategories = function(data){

        ProductsHandleService.getCategory(data)
        .then(function(data){
           angular.element(document.getElementById('showCat')).empty();
           DataService.set(data.data);
           $scope.showContent(data.data,0,10);
           $scope.showPager(0);
        });        
    }
  

    $scope.showCategoriesInit = function(){

        data = DataService.get();

        ProductsHandleService.getCategory(data)
        .then(function(data){
            DataService.set(data.data);
            $scope.showContent(data.data,0,10);
            $scope.showPager(0);
        });
    }
    
}]);    