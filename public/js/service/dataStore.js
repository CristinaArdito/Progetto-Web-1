var pwApp = angular.module('pwApp');

pwApp.factory('DataService', function() {

    console.log("Sono il data storer");

    var savedData = {}
    function set(data) {
      savedData = data;
    }
    function get() {
     return savedData;
    }
   
    return {
     set: set,
     get: get
    }
   
   })
   .run(function(DataService) {});