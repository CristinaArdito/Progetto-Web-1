var pwApp = angular.module('pwApp');

pwApp.service('OrderService', ['$q','$http',function ($q, $http)
{
    this.getAllOrder = function(){
        
        var deferred = $q.defer();

        $http.post("././api/order/allOrder")
        .then(function(value){
            deferred.resolve(value);
        })

        return deferred.promise;
    }

    this.supplierOrder = function(codes, quantity, data, mail){
        
        var deferred = $q.defer();

        $http.post("././api/order/supplierOrder",{
            'codes' : codes, 'date' : data, 'e' : mail, 'quantity' : quantity
        })
        .then(function(value){
            deferred.resolve(value);
        })

        return deferred.promise;
    }

    this.userOrder = function(codes, quantity, data, mail){
        var deferred = $q.defer();
        
                $http.post("././api/order/userOrder",{
                    'codes' : codes, 'date' : data, 'e' : mail, 'quantity' : quantity
                })
                .then(function(value){
                    deferred.resolve(value);
                })
        
                return deferred.promise;
    }
}])
.run(function(OrderService) {});