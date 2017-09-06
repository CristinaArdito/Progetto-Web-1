var pwApp = angular.module('pwApp');

pwApp.factory('DataService', function() {

    console.log("Sono il data storer");

    var savedData = null;
    var indice = -1;
    
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
    function getIndex(index){
      return savedData[index];
    }
    function setIndice(n){
      indice = n;
    }
    function getIndice(){
      return indice;
    }
    function reset(){
      savedData = null;
      indice = -1;
    }
   
    return {
     set: set,
     get: get,
     get_nonreset: get_nonreset,
     getIndex: getIndex,
     setIndice: setIndice,
     getIndice: getIndice,
     reset: reset,
    }
   
   })
   .run(function(DataService) {});