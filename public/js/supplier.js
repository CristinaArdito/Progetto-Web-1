angular.module('myApp.controllers')
.controller('showSupplierController', ['$scope', 'SupplierService','$compile', 'DataService','$location', 
function($scope, SupplierService, $compile, DataService, $location){
    console.log("showSupplierController");

        //=======================================================================================
    //Pager per creazione pagine
    $scope.showPager = function(index){

        var total = DataService.get_nonreset().length;
        var pages = Math.ceil(total/10);

        html = "<div class='topbutton'><button id='prev' ng-click='Previous("+index+")'>◀</button>";

        for(i=0;i<pages;i++){
            if(i==index){
                html += "<button style='color: #bbdefb;' ng-click='showPage("+(i*10)+")'>"+(i+1)+"</button>";
            }else html += "<button ng-click='showPage("+(i*10)+")'>"+(i+1)+"</button>";
        }

        html += "<button id='succ' ng-click='Succesive("+index+")'>▶</button></div>";

        angular.element(document.getElementById('showSupplierDiv')).append($compile(html)($scope));
   
    }

    $scope.showPage = function(n){
        
        angular.element(document.getElementById('showSupplierDiv')).empty();
        $scope.showSupplierForm(DataService.get_nonreset(),n,(n+10));
        $scope.showPager((n/10));
    }

    $scope.Previous = function(index){
        if(index > 0){
            $scope.showPage((index-1)*10);
        }
    }

    $scope.Succesive = function(index){
        if(((index+1)*6) < DataService.get_nonreset().length){
            $scope.showPage((index+1)*10);
        }
    }
    
    $scope.showSupplierForm = function(data,x,y){
        var table = "<table cellspacing='0'><tr><th>Nome</th>"+
        "<th>Email</th>"+
        "<th>Numero Tel.</th>"+
        "<th>Via</th>"+
        "<th>Città</th>"+
        "<th>CAP</th>"+
        "<th>Modifica fornitore</th>"+
        "<th>Rimuovi fornitore</th></tr>";

        console.log("showSupplierForm");
        console.log(data);

        for(i=x;i<y;i++){

        if(i>=data.length) break;

        removeSupplier = 'removeSupplier("'+data[i].email+'")';
        modifySupplier = 'updateSupplier("'+i+'")';

        table = table + "<tr><td>"+data[i].name+"</td>"+
                        "<td>"+data[i].email+"</td>"+
                        "<td>"+data[i].ntel+"</td>"+
                        "<td>"+data[i].via+"</td>"+
                        "<td>"+data[i].city+"</td>"+
                        "<td>"+data[i].cap+"</td>"+
                        "<td><button class='supplier' ng-click='"+modifySupplier+"'>Modifica fornitore</button></td>"+
                        "<td><button class='supplier' ng-click='"+removeSupplier+"'>Rimuovi fornitore</button></td></tr>";
        }

        table = table + "</table>";

        angular.element(document.getElementById('showSupplierDiv')).append($compile(table)($scope));

    }
    //=======================================================================================

    $scope.showSupplier = function(){

        angular.element(document.getElementById('showSupplierDiv')).empty();
        
        console.log("ShowSupplier");
        SupplierService.getAllSupplier()
        .then(function(data){

            DataService.set(data);
            $scope.showSupplierForm(data,0,10);
            $scope.showPager(0);
           
        })
    }

    $scope.removeSupplier = function(email){

        SupplierService.removeSupplier(email)
        .then(function(result){
            
            $scope.showSupplier();
        })

    }

    $scope.updateSupplier = function(n){

        var data = DataService.getIndex(n);
        DataService.set(data);
        $location.path("/editSupplier");
    }
}]);