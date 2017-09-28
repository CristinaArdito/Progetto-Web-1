angular.module('myApp.controllers')
.controller('editProductController', ['$scope', '$compile', '$http' , '$location' ,'DataService','ProductsHandleService', 'FileUpload',
function($scope, $compile, $http, $location, DataService, ProductsHandleService, FileUpload) {
    

    $scope.init = function(){

        ProductsHandleService.getSingleProduct(DataService.get())
        .then(function(value){

            data = value.data;

            part1 = '<span>Nome prodotto: </span><input type="text" id="name" value="'+data.name+'"></input><br>'+
            '<span>Categoria prodotto: </span>';

            part1 = part1 + angular.element(document.getElementById('addProducts'))[0].innerHTML;

            angular.element(document.getElementById('addProducts')).empty();

            part1 = part1 + '<span>Peso prodotto: </span><input type="text" id="peso" value="'+data.weight+'"></input><br>'+
                            '<span>Prezzo prodotto: </span><input type="text" id="price" value="'+data.price+'"></input><br>'+
                            '<span>Immagine prodotto (Dimensione massima 2MB): </span><input type="file" name="pic" accept=".png, .jpg"  id="img"></input>'+
                            '<input type="submit" ng-click="loadFile()" value="Carica file"></input><br>'+
                            '<span class="desc">Descrizione prodotto: </span><textarea id="desc" rows="4" cols="50" >'+data.desc+'</textarea><br>'+
                            '<button ng-click="modify()">Modifica prodotto</button>';
            
            angular.element(document.getElementById('addProducts')).append($compile(part1)($scope));
            angular.element(document.getElementById('selectionForm'))[0].value = data.categories[0];
            DataService.setIndice([data.code, data.url]);
        })
        
        
    }

    $scope.loadFile = function(){
        var file = angular.element(document.getElementById("img"))[0].files[0];
        if(file.size>2097152) alert("File troppo grande, dimensione massima 2MB");
        else FileUpload.fileReader(file);
    }

    $scope.modify = function(){
        var data = [];
        var flag = false;
        var info = DataService.getIndice();

        data[0] = angular.element(document.getElementById("name"))[0].value;
        angular.element(document.getElementById("name"))[0].value = "";
        data[0] = data[0].charAt(0).toUpperCase() + data[0].slice(1);
        data[1] = angular.element(document.getElementById("selectionForm"))[0].value;
        if(data[1].includes(",") == false) data[1] = data[1]+",";
        angular.element(document.getElementById("selectionForm"))[0].value = "Hardware";
        data[2] = angular.element(document.getElementById("peso"))[0].value;
        angular.element(document.getElementById("peso"))[0].value = "";
        data[3] = angular.element(document.getElementById("price"))[0].value;
        angular.element(document.getElementById("price"))[0].value = "";
        data[4] = angular.element(document.getElementById("img"))[0].files[0];
        angular.element(document.getElementById("img"))[0].files[0] = null;
        data[5] = angular.element(document.getElementById("desc"))[0].value;
        angular.element(document.getElementById("desc"))[0].value = "";


        if(data[4] == null){
            data[4] = info[1][0];

            for(i=0;i<data.length;i++){
                if(data[i] == ""){
                    alert("Dati non completi");
                    flag = true;
                    break;
                }
            }
            
            if(flag == false){
                ProductsHandleService.update(data, info[0]);
            }
        }else{

            flag = false;

            ProductsHandleService.storeImage(DataService.get_nonreset(), info[1][0])
            .then(function(urlValue){
                
                data[4] = urlValue.data.urlName;
                for(i=0;i<data.length;i++){
                    if(data[i] == ""){
                        alert("Dati non completi");
                        flag = true;
                        break;
                    }
                }
                
                
                if(flag == false){
                    ProductsHandleService.update(data, info[0]);
                }
            });
        }
    }
}])
