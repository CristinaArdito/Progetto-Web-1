var pwApp = angular.module('pwApp');

pwApp.factory('DataService', function() {

    console.log("Sono il data storer");

    var savedData = null;
    
    function set(data) {
      savedData = data;
    }
    function get() {
     var ret = savedData;
     savedData = null;
     return ret;
    }
    function get_nonreset() {
      var ret = savedData;
      return ret;
    }
   
    return {
     set: set,
     get: get,
     get_nonreset: get_nonreset
    }
   
   })
   .run(function(DataService) {});