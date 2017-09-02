angular.module('myApp.controllers')
.controller('showUserController', ['$scope', 'CurrentUserService','$compile', function($scope, CurrentUserService, $compile){
    console.log("showUserController");

    $scope.showUser = function(){

        console.log("ShowUser");
        CurrentUserService.getAllUser()
        .then(function(data){

            data = data.data;

            console.log(data);

            var table = "<table cellspacing='0'><tr><th>Nome</th>"+
                        "<th>Email</th>"+
                        "<th>Password</th>"+
                        "<th>Admin</th>"+
                        "<th>Rimuovi</th>"+
                        "<th>Promuovi ad Admin</th></tr>";

            for(i=0;i<data.length;i++){
                
                removeUser = 'removeUser("'+data[i].name+'","'+data[i].email+'")';
                promoteAdmin = 'promoteAdmin("'+data[i].name+'","'+data[i].email+'")';

                table = table + "<tr><td>"+data[i].name+"</td>"+
                                "<td>"+data[i].email+"</td>"+
                                "<td>********</td>"+
                                "<td>"+data[i].admin+"</td>"+
                                "<td><button ng-click='"+removeUser+"'>Rimuovi utente</button></td>"+
                                "<td><button class='promote' ng-click='"+promoteAdmin+"'>Promuovi ad Admin</button></td></tr>";
            }

            table = table + "</table>";

            console.log(table);

            angular.element(document.getElementById('showUserDiv')).append($compile(table)($scope));

        })
    }

    $scope.removeUser = function(par1,par2){

        console.log(par1);
        console.log(par2);

        /*
        CurrentUserService.removeUser(par1, par2)
        .then(function(data){
            console.log(data);
        })
        */
    }

    $scope.promoteAdmin = function(par1, par2){
        
        console.log(par1);
        console.log(par2);

        /*
        CurrentUserService.promoteAdmin(par1, par2)
        .then(function(data){
            console.log(data);
        })
        */
    }

}])
.controller('showSupplierController', ['$scope', 'SupplierService','$compile', function($scope, SupplierService, $compile){
    console.log("showSupplierController");

    $scope.showSupplier = function(){

        console.log("ShowSupplier");
        SupplierService.getAllSupplier()
        .then(function(data){

            console.log(data);

            data = data.data.data;

            console.log(data);

            var table = "<table cellspacing='0'><tr><th>Nome</th>"+
                        "<th>Email</th>"+
                        "<th>Numero Tel.</th>"+
                        "<th>Via</th>"+
                        "<th>Città</th>"+
                        "<th>CAP</th>"+
                        "<th>Rimuovi fornitore</th></tr>";

            for(i=0;i<data.length;i++){
                
                removeSupplier = 'removeSupplier("'+data[i].name+'","'+data[i].email+'")';

                table = table + "<tr><td>"+data[i].name+"</td>"+
                                "<td>"+data[i].email+"</td>"+
                                "<td>"+data[i].ntel+"</td>"+
                                "<td>"+data[i].via+"</td>"+
                                "<td>"+data[i].city+"</td>"+
                                "<td>"+data[i].cap+"</td>"+
                                "<td><button class='supplier' ng-click='"+removeSupplier+"'>Rimuovi fornitore</button></td></tr>";
            }

            table = table + "</table>";

            console.log(table);

            angular.element(document.getElementById('showSupplierDiv')).append($compile(table)($scope));

        })
    }

    $scope.removeSupplier = function(par1,par2){

        console.log(par1);
        console.log(par2);

        /*
        CurrentUserService.removeUser(par1, par2)
        .then(function(data){
            console.log(data);
        })
        */
    }
}]);