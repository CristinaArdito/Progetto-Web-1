var pwApp = angular.module('pwApp');

pwApp.service('SupplierService', ['$q','$http',function ($q, $http)
  {

    this.getAllSupplier = function(){

        var deferred = $q.defer();

        $http.post('././api/supplier/all')
        .then(function(data){
            deferred.resolve(data.data.data);
        })

        return deferred.promise;
    }

  this.addSupplier = function(data){
    var deferred = $q.defer();

    $http.post("././api/supplier/add", {
      'name' : data[0], 'email' : data[1], 'ntel' : data[2],
      'via' : data[3], 'city' : data[4], 'cap' : data[5]
    })

    return deferred.promise;
  }

  this.updateSupplier = function(data){
    var deferred = $q.defer();

    $http.post("././api/supplier/update", {
      'name' : data['name'], 'email' : data['email'], 'ntel' : data['ntel'],
      'via' : data['via'], 'city' : data['city'], 'cap' : data['cap'],
      'emailp' : data['emailp']
    })
    .then(function(result){
      deferred.resolve(result);
    })
    .catch(function(result){
      deferred.resolve(result);
    })

    return deferred.promise;
  }

  this.removeSupplier = function(email){
    var deferred = $q.defer();

    $http.post("././api/supplier/remove", {
      'q' : email
    })
    .then(function(result){
      deferred.resolve(result);
    })
    .catch(function(result){
      deferred.resolve(result);
    })

    return deferred.promise;
  }

  }])
  .run(function(SupplierService) {});