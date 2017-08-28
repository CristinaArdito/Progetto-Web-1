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

    this.storeImage = function(data){
      var deferred = $q.defer();

      $http.post("././api/product/loadImg", {
        'data' : data
      })
      .then(function(urlName){
        console.log("Success");
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