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
    var codevect = []; // sarebbe req.data lo ho impostato per testare l'API tramite ARC
    codevect[0] = 1;
    codevect[1] = 2;

    console.log(codevect);
    order_utilities.supplierOrder(req.body.date, codevect, req.body.e)
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
    var codevect = [];
    codevect[0] = 1;
    codevect[1] = 2;

    console.log(codevect);
    order_utilities.supplierOrder(req.body.date, codevect, req.body.e)
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

orderRoutes.get('/uOrderStory', function(req,res){
    order_utilities.getUserOrderStory(req.body.e)
    .then(function(orders){
        res.status(200).json({ success: true , 
                               msg: "lista di tutti gli ordini del'utente", 
                               data: products});
      })
      .catch(function(err)
      {
        res.status(400).json({ success: false , 
        msg:err, 
        data:""}); 
      });
});

orderRoutes.get('/all', function(req,res){
    order_utilities.getAllorder()
    .then(function(orders)
      {
        res.status(200).json({ success: true , 
                               msg: "lista di tutti gli ordini", 
                               data: products});
      })
      .catch(function(err)
      {
        res.status(400).json({ success: false , 
        msg:err, 
        data:""}); 
      });
});