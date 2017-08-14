var pwApp = angular.module('pwApp');

pwApp.service('orderHandle', ['$q','$http', function ($q, $http) 
  {
    this.orderProducts = function(){
        console.log("OrderHandeler");
        $http.post('#!/orders');
    }
  }])
.run(function(orderHandle) {});