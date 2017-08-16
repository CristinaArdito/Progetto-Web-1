var pwApp = angular.module('pwApp');

pwApp.service('orderHandleService', ['$q','$http', function ($q, $http) 
  {
    console.log("Servizio Ordini");

    this.orderProducts = function(){
        console.log("OrderHandeler");
    }
  }])
.run(function(orderHandleService) {});