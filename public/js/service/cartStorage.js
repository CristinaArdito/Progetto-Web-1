var pwApp = angular.module('pwApp');

pwApp.factory('CartStorage', function() {

    console.log("Sono il cart storer");

    var savedData = [];
    
    function set(data) {
      savedData = data;
      console.log(savedData);
    }
    function get() {
     return savedData;
    }
    function add(data){
        if(savedData.length == 0){
            savedData[0] = data;
            console.log(savedData);
        }else{
            savedData[savedData.length] = data;
            console.log(savedData);
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
    function getQuantity(n){
        if(n>=savedData.length) return -1;
        else return savedData[n][3];
    }
    function getItem(name, desc){
        for(i=0;i<savedData.length;i++){
            if(savedData[i][0] == name){
                if(savedData[i][1] == desc){
                    return i;
                }
            }
        }
        return -1;
    }
    
   
    return {
     set: set,
     get: get,
     add: add,
     remove: remove,
     isEmpty: isEmpty,
     setQuantity: setQuantity,
     getQuantity: getQuantity,
     getItem: getItem,
    }
   
   })
   .run(function(CartStorage) {});