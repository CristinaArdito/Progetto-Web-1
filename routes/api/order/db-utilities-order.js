var Prodotto     = require('../../../models/order');
var Q           = require('q');  // Q promise

var db_utilities_order = this;
module.exports = db_utilities_order;
// esporto db_utilities così posso utilizzare i suoi metodi e attributi,
// come fosse una libreria

// =======================
// ERROR CODES
// =======================
// codici di errore di MongoDb
var ERR_DB_DUPLICATE_KEY = '11000';