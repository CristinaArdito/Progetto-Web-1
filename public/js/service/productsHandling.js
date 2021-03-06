var pwApp = angular.module('pwApp');

pwApp.service('ProductsHandleService', ['$q','$http', function ($q, $http) 
  {
    this.getAllProducts = function(){
        return $http.post('././api/product/all')
        .then(function(response){
          return response.data.data;
        })
        .catch(function(status){
          console.log(status);
        })
    }

    this.getSingleProduct = function(product){
      var deferred = $q.defer();

      $http.post('././api/product/search', {
        'q': product
      })
      .then(function(data){
        deferred.resolve(data.data);
      })

      return deferred.promise;
    }

    this.getCategory = function(product){
      var deferred = $q.defer();

      $http.post('././api/product/search', {
        'q': product
      })
      .then(function(data){
        deferred.resolve(data.data);
      })

      return deferred.promise;
    }

    this.storeImage = function(data, url){
      var deferred = $q.defer();

      if(url == null){
        $http.post("././api/product/loadImg", {
          'data' : data, 'url' : null
        })
        .then(function(urlName){
          deferred.resolve(urlName);
        })
      }else{
        $http.post("././api/product/loadImg", {
          'data' : data, 'url' : url
        })
        .then(function(urlName){
          deferred.resolve(urlName);
        })
      }

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

    this.removeProduct = function(code,url){
      return $http.post("././api/product/remove", {
        'q' : code, 'url': url
      })
      .then(function(){
        return "success";
      })
      .catch(function(){
        return "error";
      })
    }

    this.setQuantity = function(c, q){
      return $http.post("././api/product/quantity", {
        'c' : c, 'q': q
      })
    }

    this.update = function(data, c){
      
      $http.post("././api/product/update", {
        'data' : data, 'c' : c
      })
    }

    this.sendMail = function(mail, product, quantity, total, indirizzo){

      $http.post("././api/order/sendMail", {
        'email' : mail, 'product' : product, 'quant' : quantity, 'total' : total, 'indirizzo' : indirizzo,
      })
    }
  }])
.run(function(ProductsHandleService) {});