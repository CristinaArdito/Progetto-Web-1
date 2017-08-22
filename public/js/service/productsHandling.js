var pwApp = angular.module('pwApp');

pwApp.service('ProductsHandleService', ['$q','$http', function ($q, $http) 
  {
    this.getAllProducts = function(){
        $http.post('././api/product/all')
        .then(function(response){
          console.log("Prodotti trovati: "+JSON.parse(response.data));
          return JSON.parse(data);
        })
        .catch(function(){
          console.log("errore");
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