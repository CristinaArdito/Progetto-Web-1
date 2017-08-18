// =======================
// API ROUTES 
// =======================
var express = require('express');
var bodyParser = require('body-parser');
var api_utilities = require('./user-utilities');
var adminRoutes = express.Router(); 
var userRoutes = express.Router();
module.exports = userRoutes;

userRoutes.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
userRoutes.use(bodyParser.json());
// parse application/vnd.api+json as json
userRoutes.use(bodyParser.json({ type: 'application/vnd.api+json' }));

userRoutes.post('/authenticate', function(req, res)
           {
              console.log("Body: ");
              console.log(req.body);

              var email = req.body.email;
              var psw  = req.body.password;
               // controllo parametri
              if (!email || !psw)
                  {
                    console.log("Body error qui");
                    return res.status(400).json({ success: false, 
                                                  code:     api_utilities.ERR_API_NOT_FOUND,
                                                  message: 'Bad Request. name and password required.' });  
                  }

              console.log("Dati (api_index_login): "+email+" "+psw);
               // esecuzione funzione
              api_utilities.login(email, psw)
                    .then(function(token)
                      {
                        res.status(201).json({success: true, 
                                              message: 'Enjoy your token!', 
                                              data: {'token':token}});
                      })
                    .catch(function(err)
                      { res.status(400).json({ success: false, 
                                               code: err.code,
                                               message: err.msg 
                                              }); });
            });           

/* ======================================== 
  Signup of a user, params:
   { name:"", password:""}  
*/
userRoutes.post('/signup', function(req, res)
            {
              console.log("Body: ");
              console.log(req.body);

              var name = req.body.name;
              var psw  = req.body.password;
              var email = req.body.email;
              // controllo parametri
              if (!name || !psw)
                  {
                    console.log("Body error");
                    return res.status(400).json({ success: false, 
                                                  code:api_utilities.ERR_MISSING_DATA,
                                                  message: 'Bad Request. name and password required.' });  
                  } 
               // esecuzione funzione    
              console.log("Dati (api_index): "+name+" "+psw+""+email);
              api_utilities.addUser(name, psw, email)
                    .then(function(user)
                      {
                       Console.log("In teoria è salvato");
                       res.status(201).json({ success: true , msg:"utente salvato", data:user});
                      })
                    .catch(function(err)
                      {
                         res.status(400).json({ success: false , 
                                                code:err.code,
                                                msg:err.msg, 
                                                data:""}); 
                      });
            });
/*<<<<<<< Updated upstream:routes/api/api-index.js

apiRoutes.post('/product', function(req, res)
          {
           //Da fare
          });

apiRoutes.post('/orders', function(req, res)
          {
            //console.log(req.prodotto1);
          });
=======
>>>>>>> Stashed changes:routes/api/user/user-index.js*/
