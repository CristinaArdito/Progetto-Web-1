// =======================
// API ROUTES 
// =======================
var express = require('express');
var bodyParser = require('body-parser');
var supplier_utilities = require('./supplier-utilities');
var adminRoutes = express.Router(); 
var supplierRoutes = express.Router();
module.exports = supplierRoutes;

supplierRoutes.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
supplierRoutes.use(bodyParser.json());
// parse application/vnd.api+json as json
supplierRoutes.use(bodyParser.json({ type: 'application/vnd.api+json' }));     

supplierRoutes.post('/add', function(req, res)
            {
              console.log("Body: ");
              console.log(req.body);

              var name = req.body.name;
              var ntel  = req.body.ntel;
              var email = req.body.email;
              var city = req.body.city;
              var via = req.body.via;
              var cap = req.body.cap;

              // controllo parametri
              if (!name || !email)
                  {
                    console.log("Body error");
                    return res.status(400).json({ success: false, 
                                                  code:supplier_utilities.ERR_MISSING_DATA,
                                                  message: 'Bad Request. Name and Email required.' });  
                  } 
               // esecuzione funzione    
              console.log("Dati (api_index): "+name+" "+email);
              supplier_utilities.addSupplier(name, ntel, email, city, via, cap)
                    .then(function(supplier)
                      {
                       Console.log("In teoria è salvato");
                       res.status(201).json({ success: true , msg:"utente salvato", data:supplier});
                      })
                    .catch(function(err)
                      {
                         res.status(400).json({ success: false , 
                                                code:err.code,
                                                msg:err.msg, 
                                                data:""}); 
                      });
            });

supplierRoutes.get('/all', function(req,res){
  supplier_utilities.getAllSupplier()
  .then(function(supplier){
    console.log("\n\nUser: "+supplier);
    res.status(200).json({
      success: true,
      msg: "Lista di tutti i fornitori",
      data : supplier
    });
  })
  .catch(function(err){
    res.status(400).json({
      success: false,
      msg:err,
      data:""
    });
  });
});