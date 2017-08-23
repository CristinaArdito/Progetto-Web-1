var pwApp = angular.module('pwApp');

pwApp.service('ProductsHandleService', ['$q','$http', function ($q, $http) 
  {
    this.getAllProducts = function(){
        return $http.post('././api/product/all')
        .then(function(response){
          console.log("Prodotti trovati: ");
          console.log(response.data.data);
          return response.data.data;
        })
        .catch(function(status){
          console.log(status);
        })
    }

    this.getSingleProduct = function(product){
      $http.post('././api/product/search', {
        'q': JSON.stringify(product)
      })
      .then(function(data){
        console.log(JSON.parse(data));
      })
    }

    this.addProduct = function(data){
      console.log(data);
    }
  }])
.run(function(ProductsHandleService) {});