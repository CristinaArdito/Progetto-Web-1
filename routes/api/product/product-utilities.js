var jwt         = require('jsonwebtoken');    // used to create, sign, and verify tokens
var Product     = require('../../../models/product') // get our mongoose Product model
var Q           = require('q');  // Q promise

var db_utilities_product=require('./db-utilities-product');

var product_utilities = this;
// esporto api_utilities così posso utilizzare i suoi metodi e attributi,
// come fosse una libreria
module.exports = product_utilities;

// =======================
// ERROR CODES
// =======================
this.ERR_API_NOT_FOUND = 'ERR_API_NOT_FOUND';
this.ERR_API_WRONG_PSW = 'ERR_API_WRONG_PSW';
this.ERR_MISSING_DATA  = 'ERR_MISSING_DATA';

// =======================
// FUNCTIONS
// =======================

this.addProduct = function(name, desc, price){
  return db_utilities_product.addProduct({name:name, 
                               desc:desc,
                               price:price,
                               url:"test"
                              });  //ritorna una promessa
}

this.getAllProducts = function(){
   var deferred = Q.defer();
    Product.find({})
        .then(function(product) 
            { 
             console.log("getAllProducts "+JSON.stringify(product));
             deferred.resolve(product); 
            })
        .catch(function(err)
            {
             logger.error('[getAllProducts] '+err);
             deferred.reject({code:"", msg:err});  
            });
    return deferred.promise;
}

this.orderProducts = function(){
  var deferred = Q.defer();
  console.log("ordine prodotti");
  return deferred.promise;
}