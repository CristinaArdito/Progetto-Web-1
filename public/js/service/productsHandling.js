var pwApp = angular.module('pwApp');

pwApp.service('ProductsHandle', ['$q','$http', function ($q, $http) 
  {
    this.getAllProducts = function(){
        $http.post('http://localhost:8080/api/products');
    }
  }])
.run(function(ProductsHandle) {});