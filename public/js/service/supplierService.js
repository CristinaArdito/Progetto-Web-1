var pwApp = angular.module('pwApp');

pwApp.service('SupplierService', ['$q','$http',function ($q, $http)
  {

    this.getAllSupplier = function(){

        var deferred = $q.defer();

        $http.post('././api/supplier/all')
        .then(function(data){
            console.log(data);
            deferred.resolve(data);
        })

        return deferred.promise;
    }

  }])
  .run(function(SupplierService) {});