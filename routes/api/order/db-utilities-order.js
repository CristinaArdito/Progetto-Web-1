var Order     = require('../../../models/order');
var Q           = require('q');  // Q promise
var Product = require('../../../models/product');

var db_utilities_order = this;
module.exports = db_utilities_order;
// esporto db_utilities così posso utilizzare i suoi metodi e attributi,
// come fosse una libreria

// =======================
// ERROR CODES
// =======================
// codici di errore di MongoDb
var ERR_DB_DUPLICATE_KEY = '11000';

this.totalPrice = function(codevect){
    var total = 0;
    
    for(var i = 0; i<codevect.length;i++){
        Product.find({ "code" : codevect[i]})
        .then(function(product){
            console.log(product[0].price);
            total = total + parseInt(product[0].price); 
            console.log("totale " + total);
        });
    }
    
    return total;
}

this.saveData = function(total, data, email, codevect, flag){
    var deferred = Q.defer();

    console.log("entro " + total);
    var order = {data:data, product:codevect, email:email ,user:flag, totalPrice:total};
    var orders = new Order(order);
    
    orders.save()
        
    return order;
};