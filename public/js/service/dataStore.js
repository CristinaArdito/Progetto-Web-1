var pwApp = angular.module('pwApp');

pwApp.factory('DataService', function() {

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
    function add(element){
      if(savedData == null){
        savedData = [];
        savedData[0] = element;
      }else{
        savedData[savedData.length] = element;
      }
    }
   
    return {
     set: set,
     get: get,
     get_nonreset: get_nonreset,
     getIndex: getIndex,
     setIndice: setIndice,
     getIndice: getIndice,
     reset: reset,
     add: add,
    }
   
   })
   .run(function(DataService) {});