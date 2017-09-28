angular.module('myApp.controllers')
.controller('showUserController', ['$scope', 'CurrentUserService','$compile', 'DataService', 
function($scope, CurrentUserService, $compile, DataService){


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

        angular.element(document.getElementById('showUserDiv')).append($compile(html)($scope));
   
    }

    $scope.showPage = function(n){
        
        angular.element(document.getElementById('showUserDiv')).empty();
        $scope.showUserForm(DataService.get_nonreset(),n,(n+10));
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
    
    $scope.showUserForm = function(data,x,y){
        var table = "<table cellspacing='0'><tr><th>Nome</th>"+
        "<th>Email</th>"+
        "<th>Password</th>"+
        "<th>Admin</th>"+
        "<th>Rimuovi</th>"+
        "<th>Promuovi ad Admin</th></tr>";


        for(i=x;i<y;i++){

        if(i>= data.length) break;
        removeUser = 'removeUser("'+data[i].email+'")';
        promoteAdmin = 'promoteAdmin("'+data[i].email+'")';

        table = table + "<tr><td>"+data[i].name+"</td>"+
                        "<td>"+data[i].email+"</td>"+
                        "<td>********</td>"+
                        "<td>"+data[i].admin+"</td>"+
                        "<td><button class='remove' ng-click='"+removeUser+"'>Rimuovi utente</button></td>"+
                        "<td><button class='promote' ng-click='"+promoteAdmin+"'>Promuovi ad Admin</button></td></tr>";
        }

        table = table + "</table>";
        angular.element(document.getElementById('showUserDiv')).append($compile(table)($scope));
    }
    //=======================================================================================

    $scope.showUser = function(){

        angular.element(document.getElementById('showUserDiv')).empty();

        CurrentUserService.getAllUser()
        .then(function(data){

            data = data.data;

            DataService.set(data);
            $scope.showUserForm(data,0,10);
            $scope.showPager(0);
        })
    }

    $scope.removeUser = function(par){


        CurrentUserService.removeUser(par)
        .then(function(data){
            $scope.showUser();
        })
    }

    $scope.promoteAdmin = function(par){
        
        CurrentUserService.promoteAdmin(par)
        .then(function(data){
            $scope.showUser();
        })
        .catch(function(data){
            $scope.showUser();
        })
        
    }

}])