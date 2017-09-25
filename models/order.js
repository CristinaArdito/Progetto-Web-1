// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
var Order = mongoose.model('Order', new Schema({ 
    productCode: [[{type:Number}][{ type:Number }]],
    email: {type:String},
    user: {type:Boolean},
    totalPrice: {type:Number}
}));

module.exports = Order;