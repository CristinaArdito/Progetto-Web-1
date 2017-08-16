var pwApp = angular.module('pwApp');

pwApp.service('ProductsHandleService', ['$q','$http', function ($q, $http) 
  {
    this.getAllProducts = function(){
        $http.post('http://localhost:8080/orders');
    }
  }])
.run(function(ProductsHandleService) {});