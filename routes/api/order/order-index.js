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

orderRoutes.post('/userOrder', function(req,res){
    var codevect = req.body.codes;

    console.log(codevect);
    order_utilities.userOrder(req.body.date, codevect, req.body.quantity, req.body.e)
    .then(function(order){
        res.status(201).json({ 
            success: true ,
            msg:order,
            data:""});
    })
    .catch(function(err)
    {
        res.status(400).json({ success: false , 
                               code:err.code,
                               msg:err.msg, 
                               data:""});
    }) 
});

orderRoutes.post('/supplierOrder', function(req,res){

    var codevect = req.body.codes;

    console.log(codevect);
    order_utilities.supplierOrder(req.body.date, codevect, req.body.quantity, req.body.e)
    .then(function(order){
        res.status(201).json({ 
            success: true ,
            msg:order,
            data:""});
    })
    .catch(function(err)
    {
        res.status(400).json({ success: false , 
                               code:err.code,
                               msg:err.msg, 
                               data:""});
    }) 
});

orderRoutes.post('/uOrderStory', function(req,res){
    order_utilities.getUserOrderStory(req.body.e)
    .then(function(orders){
        res.status(200).json({ success: true , 
                               msg: "lista di tutti gli ordini del'utente", 
                               data: orders});
      })
      .catch(function(err)
      {
        res.status(400).json({ success: false , 
        msg:err, 
        data:""}); 
      });
});

orderRoutes.post('/allOrder', function(req,res){
    console.log("All order");
    order_utilities.getAllOrder()
    .then(function(orders)
      {
        console.log(orders);
        res.status(200).json({ success: true , 
                               msg: "lista di tutti gli ordini", 
                               data: orders});
      })
      .catch(function(err)
      {
        res.status(400).json({ success: false , 
        msg:err, 
        data:""}); 
      });
});