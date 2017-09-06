// =======================
// API ROUTES 
// =======================
var express = require('express');
var bodyParser = require('body-parser');
var user_utilities = require('./user-utilities');
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
                                                  code:     user_utilities.ERR_API_NOT_FOUND,
                                                  message: 'Bad Request. name and password required.' });  
                  }

              console.log("Dati (api_index_login): "+email+" "+psw);
               // esecuzione funzione
               user_utilities.login(email, psw)
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
                                                  code:user_utilities.ERR_MISSING_DATA,
                                                  message: 'Bad Request. name and password required.' });  
                  } 
               // esecuzione funzione    
              console.log("Dati (api_index): "+name+" "+psw+""+email);
              user_utilities.addUser(name, psw, email)
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

userRoutes.post('/all', function(req, res){
  user_utilities.getAllUser()
    .then(function(user){
      console.log("\n\nUser: "+user);
      res.status(200).json({
        success: true,
        msg: "Lista di tutti gli utenti",
        data : user
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

userRoutes.post('/remove',function(req, res){
  user_utilities.deleteUser(req.body.q)
    .then(function(user){
      res.status(200).json({
        success:true,
        msg: "Rimosso",
        data:""
      })
    })
    .catch(function(err){
      res.status(400).json({
        success: false,
        msg: err,
        data:""
      })
    })
});

userRoutes.post('/op', function(req, res){
  user_utilities.op(req.body.q)
  .then(function(user){
    res.status(410).json({
      success:true,
      msg: "Opped",
      data:""
    })
  })
  .catch(function(err){
    res.status(400).json({
      success: false,
      msg: err,
      data:""
    })
  })
});

userRoutes.post('/deop', function(req, res){
  user_utilities.deOp(req.body.q)
  .then(function(user){
    res.status(200).json({
      success:true,
      msg: "DeOpped",
      data:""
    })
  })
  .catch(function(err){
    res.status(400).json({
      success: false,
      msg: err,
      data:""
    })
  })
});