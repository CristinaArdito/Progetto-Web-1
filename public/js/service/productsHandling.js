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
      var deferred = $q.defer();

      console.log("Ricerca");

      $http.post('././api/product/search', {
        'q': product
      })
      .then(function(data){
        console.log(data);
        deferred.resolve(data.data);
      })

      return deferred.promise;
    }

    this.getCategory = function(product){
      console.log(product);
      
      var deferred = $q.defer();

      $http.post('././api/product/search', {
        'q': product
      })
      .then(function(data){
        deferred.resolve(data.data);
      })

      return deferred.promise;
    }

    this.storeImage = function(data){
      var deferred = $q.defer();

      $http.post("././api/product/loadImg", {
        'data' : data
      })
      .then(function(urlName){
        deferred.resolve(urlName);
      })

      return deferred.promise;
    }

    this.addProduct = function(data){
      return $http.post("././api/product/add", {
        'data' : data
      })
      .then(function(){
          return "success";
      })
      .catch(function(){
        return "error";
      })
    }
  }])
.run(function(ProductsHandleService) {});