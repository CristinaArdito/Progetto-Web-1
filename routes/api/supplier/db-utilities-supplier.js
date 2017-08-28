var Supplier        = require('../../../models/supplier');   // get our mongoose supplier model
var Q           = require('q');  // Q promise

var db_utilities_supplier = this;
module.exports = db_utilities_supplier;
// esporto db_utilities così posso utilizzare i suoi metodi e attributi,
// come fosse una libreria


// =======================
// ERROR CODES
// =======================
// codici di errore di MongoDb
var ERR_DB_DUPLICATE_KEY = '11000';

this.addSupplier = function(supplier)
{
 var deferred = Q.defer();
    
 // metto questo controllo sulla psw come esempio di utilizzo di deferred.reject
 // in realtà dovrei metterlo nello schema di Mongoose
    
  // crea un Utente, che deve rispettare lo schema definito con mongoose
  var supp = new Supplier(supplier);

  // save the sample supplier
  supp.save()
             .then(function(supplier)
                {
                 console.log("Dovrebbe essere salvato");
                 logger.debug('utente salvato '+JSON.stringify(supplier));
                 /* eventuale invio email */
                 deferred.resolve(supplier);
                })
              .catch(function(err)
                 {
                  if (err.code == ERR_DB_DUPLICATE_KEY)
                      {deferred.reject({code:'ERR_DB_DUPLICATE_KEY', 
                                        msg:'questo utente esiste gia'}); }
                  else
                      {logger.error('[addsupplier] errore salvataggio utente '+err.errmsg);}
                  deferred.reject(err.errmsg);   
                 });
    return deferred.promise;
  }