var jwt         = require('jsonwebtoken');    // used to create, sign, and verify tokens
var Product     = require('../../../models/product') // get our mongoose Product model
var Q           = require('q');  // Q promise
//var nodemailer = require('nodemailer');
//var smtpTransport = require('nodemailer-smtp-transport');
var Admin       = require('../../../models/user');
var Order     = require('../../../models/order');

var db_utilities=require('./db-utilities-order');

var order_utilities = this;
// esporto api_utilities così posso utilizzare i suoi metodi e attributi,
// come fosse una libreria
module.exports = order_utilities;

// =======================
// ERROR CODES
// =======================
this.ERR_API_NOT_FOUND = 'ERR_API_NOT_FOUND';
this.ERR_API_WRONG_PSW = 'ERR_API_WRONG_PSW';
this.ERR_MISSING_DATA  = 'ERR_MISSING_DATA';

// =======================
// FUNCTIONS
// =======================

this.supplierOrder = function(data, codevect, quantity, email){

    var deferredP = Q.defer();

    var total = 0;
    
        for(var i = 0; i<codevect.length;i++){
            Product.find({ "code" : codevect[i]})
            .then(function(product){
                //console.log(product[0].price);
                total = total + parseInt(product[0].price); 
                //console.log("totale " + total);
            });
        }
    
    setTimeout(function(){
        deferredP.resolve(db_utilities.saveData(total, data, email, quantity, codevect,"false"));
    },2000);
    
    return deferredP.promise;
};

this.userOrder = function(data,codevect, email){
    
        var deferredP = Q.defer();
    
        var total = 0;
    
        for(var i = 0; i<codevect.length;i++){
            Product.find({ "code" : codevect[i]})
            .then(function(product){
                console.log(product[0].price);
                total = total + parseInt(product[0].price); 
                console.log("totale " + total);
            });
        }
    
        setTimeout(function(){
            deferredP.resolve(db_utilities.saveData(total, data, email, codevect,"true"));
        },2000);
        
        return deferredP.promise;
};
    
this.getAllOrder = function(){
    var deferred = Q.defer();

    console.log("Get all orders");
    Order.find({})
        .then(function(order) 
            { 
             deferred.resolve(order);
            })
        .catch(function(err)
            {
             logger.error('[getAllOrders] '+err);
             deferred.reject({code:"", msg:err});  
            });

    return deferred.promise;
}

this.getUserOrderStory = function(email){
    var deferred = Q.defer();
    Order.find({"email":email})
        .then(function(order) 
            { 
             deferred.resolve(order);
            })
        .catch(function(err)
            {
             logger.error('[getAllOrders] '+err);
             deferred.reject({code:"", msg:err});  
            });
    return deferred.promise;
}