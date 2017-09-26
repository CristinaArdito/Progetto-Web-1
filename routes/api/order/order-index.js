// =======================
// API ROUTES 
// =======================
var express = require('express');
var bodyParser = require('body-parser');
var order_utilities = require('./order-utilities');
var fs = require('fs');
var adminRoutes = express.Router(); 
var orderRoutes = express.Router();
module.exports = orderRoutes;

orderRoutes.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
orderRoutes.use(bodyParser.json());
// parse application/vnd.api+json as json
orderRoutes.use(bodyParser.json({ type: 'application/vnd.api+json' }));

orderRoutes.post('/userOrder', function(req,res){});

orderRoutes.post('/supplierOrder', function(req,res){
    classi = Array();
    classi[0]= new Array('Aldo','Giovanni', 'Giacomo');
    classi[1]= new Array ('Mario','Gianni','Monica');
    console.log(classi[1][1] + " "  + classi[0][1]);
});

orderRoutes.get('/uOrderStory', function(req,res){
    
});

orderRoutes.get('/orderTnumber', function(req,res){});

orderRoutes.get('/orderTable',function(req,res){});

orderRoutes.get('/orderByNumber', function(req,res){});