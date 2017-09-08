angular.module('myApp.controllers')
.controller('searchProductHomeController', ['$scope', '$compile', '$location', 'CartStorage', 'DataService','ProductsHandleService',
function($scope,$compile,$location,CartStorage,DataService, ProductsHandleService){

    $scope.searchProducts = function(){
       $location.path('/searchprod')
       var search = angular.element(document.getElementById("mainSearchBox"))[0].value;
       angular.element(document.getElementById("mainSearchBox"))[0].value = "";
       search = search.charAt(0).toUpperCase() + search.slice(1);

       angular.element(document.getElementById('showProd')).empty();
       
       ProductsHandleService.getSingleProduct(search)
       .then(function(value){

            value = value.data;

            if(value.length == 0){
                var message = "<div class='noproduct'><span>Nessun prodotto corrispondente a: "+search+"</span></div>";
                angular.element(document.getElementById('showProd')).append($compile(message)($scope));
            }
            else{
            DataService.set(value);
            $scope.showContent(value,0,10);
            $scope.showPager();
            }
       });
    }

    //=========================================================================================================================
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

        angular.element(document.getElementById('showProd')).append($compile(html)($scope));

        
    }

    $scope.showPage = function(n){
        
        angular.element(document.getElementById('showProd')).empty();
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
    //=========================================================================================================================

    $scope.showContent = function(value, x, y){
                
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
    angular.element(document.getElementById('showProd')).append($compile(html)($scope));
    }

    $scope.showSingleProduct = function(data){
        DataService.setIndice(data);
        $location.path('/singleproduct');
    }

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

    $scope.showCategories = function(data){
        ProductsHandleService.getCategory(data)
        .then(function(data){
            angular.element(document.getElementById('showProd')).empty();
            DataService.set(data.data);
            $scope.showContent(data.data,0,10);
            $scope.showPager(0);
        });        
    }
}])