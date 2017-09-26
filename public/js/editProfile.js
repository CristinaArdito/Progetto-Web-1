angular.module('myApp.controllers')
.controller('userEditController', ['$scope', '$compile', 'CurrentUserService',
function($scope, $compile, CurrentUserService){

    var user = [];

    $scope.init = function(){

        var mail = CurrentUserService.getSelf();

        CurrentUserService.getAllUser()
        .then(function(value){

            value = value.data;

            for(i=0;i<value.length;i++){
                if(value[i].email == mail){
                    user = value[i];
                    break;
                } 
            }

            console.log(user);

            html = '<div class="title"><h3>Contact Information</h3></div>'+
                   '<div class="nome"> Nome: <span>'+user.name+'</span> </div>'+
                   '<div class="email"> E-mail: <span>'+user.email+'</span></div>'+
                   '<button class="btn" ng-click="modify()">Edit profile</button>';

            angular.element(document.getElementById('profile')).append($compile(html)($scope));
        })
    }

    $scope.modify = function(){
        angular.element(document.getElementById('profile')).empty();

        html = '<div>Nome utente: <input type="text" id="name" value="'+user.name+'"></input></div>'+
               '<div>Password precedente: <input type="password" id="oldPass"></input></div>'+
               '<div>Nuova password: <input type="password" id="newPass"></input>'+
               '<div><button type="submit" ng-click="edit()">Modifica profilo</button>';


        angular.element(document.getElementById('profile')).append($compile(html)($scope));

    }


    $scope.edit = function(){

        var data = [];

        data[0] = angular.element(document.getElementById('name'))[0].value;
        data[1] = user.email;
        data[2] = angular.element(document.getElementById('newPass'))[0].value;
        data[3] = angular.element(document.getElementById('oldPass'))[0].value;


        if(data[3] == "" && data[2] == ""){
            data[2] = user.password;
            CurrentUserService.update(data)
            .then(function(value){
                console.log(value);
            })
        }else if(data[3] != user.password){
            alert("Password corrente errata");
        }else{
            if(data[2] == ""){
                alert("Inserire nuova password");
            }else{
                CurrentUserService.update(data)
                .then(function(value){
                    angular.element(document.getElementById('profile')).empty();
                    $scope.init();
                    alert("Informazioni profilo modificate");
                })
            }
        }

    }
}])