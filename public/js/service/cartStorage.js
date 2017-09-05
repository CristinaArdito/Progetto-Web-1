var pwApp = angular.module('pwApp');

pwApp.factory('CartStorage', function() {

    console.log("Sono il cart storer");

    var savedData = [];
    
    function set(data) {
      savedData = data;
    }
    function get() {
     return savedData;
    }
    function add(data){
        if(savedData == []){
            savedData[0] = data;
        }else{
            savedData[savedData.length] = data;
        }
    }
    function remove(index){
        j=0;
        newData = [];
        for(i=0;i<savedData.length;i++){
            if(i != index){
                newData[j] = savedData[i];
                j++;
            }
        }
        savedData = newData;
    }
    function isEmpty(){
        if(savedData.length == 0) return true
        else return false;
    }
    function setQuantity(index,number){
        savedData[index][3] = number;
    }
   
    return {
     set: set,
     get: get,
     add: add,
     remove: remove,
     isEmpty: isEmpty,
     setQuantity: setQuantity
    }
   
   })
   .run(function(CartStorage) {});