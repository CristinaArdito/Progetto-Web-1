angular.module('myApp.controllers')
angular.module('myApp.controllers')
.controller('addSupplierController', ['$scope','SupplierService', function($scope, SupplierService) {

    $scope.addSupplier = function(){

        var param = [];
        param[0] = angular.element(document.getElementById("name"))[0].value;
        param[1] = angular.element(document.getElementById("email"))[0].value;
        param[2] = angular.element(document.getElementById("tel"))[0].value;
        param[3] = angular.element(document.getElementById("via"))[0].value;
        param[4] = angular.element(document.getElementById("city"))[0].value;
        param[5] = angular.element(document.getElementById("cap"))[0].value;

        SupplierService.addSupplier(param);
    }
}])