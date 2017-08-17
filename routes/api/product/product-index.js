// =======================
// API ROUTES 
// =======================
var express = require('express');
var bodyParser = require('body-parser');
var product_utilities = require('./product-utilities');
var adminRoutes = express.Router(); 
var productRoutes = express.Router();
module.exports = productRoutes;

productRoutes.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
productRoutes.use(bodyParser.json());
// parse application/vnd.api+json as json
productRoutes.use(bodyParser.json({ type: 'application/vnd.api+json' }));

productRoutes.get('/products', function(req, res)
          {
            product_utilities.getAllUsers()
            .then(function(users)
              {
               res.status(201).json({ success: true , 
                                      msg:"lista di tutti gli utenti", 
                                      data:users});
              })
            .catch(function(err)
              {
                 res.status(400).json({ success: false , 
                                        msg:err, 
                                        data:""}); 
              });
          });

productRoutes.post('/orders', function(req, res)
          {
            console.log("Sono l'handler degli ordini");
            console.log(req);
          });