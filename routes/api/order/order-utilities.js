var jwt         = require('jsonwebtoken');    // used to create, sign, and verify tokens
var Product     = require('../../../models/product') // get our mongoose Product model
var Q           = require('q');  // Q promise
var nodemailer = require('nodemailer');
//var smtpTransport = require('nodemailer-smtp-transport');
var Admin       = require('../../../models/user');

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