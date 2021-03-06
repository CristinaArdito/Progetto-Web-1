var Supplier        = require('../../../models/supplier');   // get our mongoose User model
var Q           = require('q');  // Q promise

var db_utilities=require('./db-utilities-supplier');

var supplier_utilities = this;
// esporto api_utilities così posso utilizzare i suoi metodi e attributi,
// come fosse una libreria
module.exports = supplier_utilities;

// =======================
// ERROR CODES
// =======================
this.ERR_API_NOT_FOUND = 'ERR_API_NOT_FOUND';
this.ERR_API_WRONG_PSW = 'ERR_API_WRONG_PSW';
this.ERR_MISSING_DATA  = 'ERR_MISSING_DATA';



// =======================
// FUNCTIONS
// =======================

/* registra e aggiunge un utente al db */
this.addSupplier = function(name, ntel, email, city, via, cap)
{
   console.log("Dati (user_utilities): "+name+" "+email);
  return db_utilities.addSupplier({name:name, 
                               ntel:ntel,
                               email:email,
                               city:city,
                               via:via,
                               cap:cap
                              });  //ritorna una promessa
}

this.getAllSupplier = function(){
    var deferred = Q.defer();
    Supplier.find({})
      .then(function(supplier){
        console.log("\n\ngetAllUser" + JSON.stringify(supplier));
        deferred.resolve(supplier);
      })
      .catch(function(err){
        logger.error('[getAllProducts]' +err);
        deferred.reject({code:"",msg:err});
      });
    return deferred.promise;
}

this.deleteSupplier = function(q){
  var deferred = Q.defer();

  Supplier.remove({"email":q}, function(err,resoult){
    if(!err){
      console.log("Rimosso");
      deferred.resolve(resoult);
    }else{
      console.log("Errore forse da qualche parte");
      deferred.reject(resoult);
    }
  });

  return deferred.promise;
}

this.update = function(name, ntel, email, city, via, cap, emailP){
  var deferred = Q.defer();
  Supplier.update({"email":emailP},{$set:{"name":name,"ntel":ntel,"email":email,"city":city,"cap":cap,"via":via}}, function(err,resoult){
    if(err){
      console.log("ops");
      deferred.reject(resoult);
    }else{
      console.log("cambiato");
      deferred.resolve(resoult);
    }
});
return deferred.promise;
}