var product     = require('../../../models/product');
var Q           = require('q');  // Q promise

var db_utilities_product = this;
module.exports = db_utilities_product;
// esporto db_utilities così posso utilizzare i suoi metodi e attributi,
// come fosse una libreria

// =======================
// ERROR CODES
// =======================
// codici di errore di MongoDb
var ERR_DB_DUPLICATE_KEY = '11000';

this.addProduct = function(product){
  console.log("addProduct in bd_utilities");
  console.log(product);
  var deferred = Q.defer();

  if(!product.name || product.name == "")
    {
      deferred.reject('inserire nome del prodotto');
      return deferred.promise;
    }
    
  var prodotto = new Prodotto(product);

  console.log("prodotto");
  console.log(prodotto);

  prodotto.save()
            .then(function(product)
              {
                console.log("Dovrebbe essere salvato");
                logger.debug('utente salvato '+JSON.stringify(product));
                deferred.resolve(product);
                })
            .catch(function(err)
                {
                if (err.code == ERR_DB_DUPLICATE_KEY)
                    {deferred.reject({code:'ERR_DB_DUPLICATE_KEY', 
                                      msg:'questo utente esiste gia'}); }
                else
                    {logger.error('[addUser] errore salvataggio utente '+err.errmsg);}
                deferred.reject(err.errmsg);   
                });
  return deferred.promise;
}

this.getAllProducts = function(){
  var prodotti = new Product(product);

  prodotti.find()
    .then(function(product)
    {
      console.log(product);
      deferred.resolve(product);
    })
    .catch(function()
    {
      deferred.reject();
    });
}