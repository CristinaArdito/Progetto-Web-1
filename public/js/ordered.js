angular.module('myApp.controllers')
.controller('orderedController', [ '$scope', '$compile', '$http', '$location', 'DataService', 'OrderService',
function($scope, $compile, $http, $location, DataService, OrderService) {


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

        angular.element(document.getElementById('orderedForm')).append($compile(html)($scope));
   
    }

    $scope.showPage = function(n){
        
        angular.element(document.getElementById('orderedForm')).empty();
        $scope.showOrders(DataService.get_nonreset(),n,(n+6));
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
    //==========================================================================================

    $scope.showOrders = function(data,x,y){

            html = "<table cellspacing='0' >"+
                   "<tr>"+"<th>Email</th>"+
                   "<th>Data</th>"+
                   "<th>Codice prodotto</th>"+
                   "<th>Quantità</th></tr>";

            for(i=x;i<y;i++){

                if(i>= data.length) break;
            
                html += "<tr><td>"+data[i].email+"</td>"+
                        "<td>"+data[i].data+"</td>"+
                        "<td>";
                for(j=0;j<data[i].productCode.length;j++){
                    html += ""+data[i].productCode[j]+"<br>";
                }
                html += "</td><td>";
                for(j=0;j<data[i].quantity.length;j++){
                    html += ""+data[i].quantity[j]+"<br>";
                }
                html += "</td></tr>";
            }

            html += "</table>";

            angular.element(document.getElementById('orderedForm')).append($compile(html)($scope));
    }


    $scope.init = function(){
        OrderService.getAllOrder()
        .then(function(value){
           
            console.log(value.data.data);
            data = value.data.data;

            DataService.set(data);
            $scope.showOrders(data,0,6);
            $scope.showPager(0);
        })
    }


    
}])