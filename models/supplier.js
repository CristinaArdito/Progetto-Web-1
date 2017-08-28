// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
var Supplier = mongoose.model('Supplier', new Schema({ 
    name    : { type:String , unique:true, required:true },
    email   : String,
    ntel : Number,
    city : String,
    via : String,
    cap : Number
}));

module.exports = Supplier;