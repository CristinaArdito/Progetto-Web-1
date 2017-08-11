var jwt         = require('jsonwebtoken');    // used to create, sign, and verify tokens
var User        = require('../../models/user');   // get our mongoose User model
var Q           = require('q');  // Q promise

var db_utilities=require('../db-utilities');

var api_utilities = this;
// esporto api_utilities così posso utilizzare i suoi metodi e attributi,
// come fosse una libreria
module.exports = api_utilities;




// =======================
// ERROR CODES
// =======================
this.ERR_API_NOT_FOUND = 'ERR_API_NOT_FOUND';
this.ERR_API_WRONG_PSW = 'ERR_API_WRONG_PSW';
this.ERR_MISSING_DATA  = 'ERR_MISSING_DATA';



// =======================
// FUNCTIONS
// =======================

/* registra e aggiunge un utente al db */
this.addUser = function(name, password, email)
{
   console.log("Dati (api_utilities): "+name+" "+password+" "+email);
  return db_utilities.addUser({name:name, 
                               password:password,
                               email:email,
                               admin:false
                              });  //ritorna una promessa
  }



this.login = function(email, psw) 
{ 

  console.log("Dati (api utilities login): "+email+" "+psw);
  //console.log(User);
  var deferred = Q.defer();
    
  // find the user
  User.findOne({ email: email})
      .then(function(User) 
        {
         if (!User) 
          {             
            deferred.reject({code:this.ERR_API_NOT_FOUND,
                             msg:'utente non trovato'});  
          } 
        else 
          {
            // check if password matches
            if (User.password != psw) 
              { 
                deferred.reject({code:this.ERR_API_WRONG_PSW,
                                 msg:'credenziali errate'}); 
              } 
            else 
              {
               // if user is found and password is right
               // create a token
               var token = jwt.sign(User, 
                                    '!La|R5Rb1sp^V8VKrWqiQw£z\cb&/WJ#7FUSvC8rvyLtY\ZTwrF4bstRt@x!XN&', 
                                    {expiresIn: 1440}
                                 );
               // return the information including token as JSON
               deferred.resolve(token);
          }   
        }
      })
     .catch(function(err)
        {
         // altri possibili errori
         deferred.reject({code:"", msg:err}); 
        }); 
 return deferred.promise;
}