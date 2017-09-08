var pwApp = angular.module('pwApp');

pwApp.service('CurrentUserService', ['$q','$http', function ($q, $http) 
  {   // initialization
    console.log('ciao sono il CurrentUserService');
    var self = null;

 
/* ========================================
    FUNCTIONS
================================================*/

    this.isLogged = function(){
        if(self == null) return false;
        else return true;
    }

    this.logout = function(){
        self=null;
    }


    this.login = function(email, psw)
	    {
         var deferred = $q.defer();

        $http.post('././api/user/authenticate',
                    {'email':email, 'password':psw})
             .then(function(data) 
                 {
                  self = data.data.data.token;      // mi salvo l'utente corrente
                  deferred.resolve(self);
                 })
             .catch(function(err, code) 
                 { 
                  self = null; // resetto l'utente
                  deferred.reject(err.messaggio);
                 });
        return deferred.promise; 
    }      

    this.signup = function(name, psw, email)
	    {
         var deferred = $q.defer(); 
         return $http.post('././api/user/signup',
                    {'name':name, 'password':psw, 'email':email})
             .then(function(data) 
                 {
                  self.utenteLoggato = data;      // mi salvo l'utente corrente
                  deferred.resolve(data);
                  console.log(data);
                 })
             .catch(function(err, code) 
                 {  
                  self.utenteLoggato = undefined; // resetto l'utente
                  deferred.reject(err);
                 });
        return deferred.promise; 
        }   
    
    
    /* quando dovrò fare richieste, e mi serve il token dell'utente,
     lo riprendo con: self.utenteLoggato.token    */
    
    this.getAllUser = function(){
        var deferred = $q.defer();

        $http.post("././api/user/all")
        .then(function(data){
            deferred.resolve(data.data);
        })

        return deferred.promise;
    }

    this.removeUser = function(par){
        var deferred = $q.defer();
        
        return $http.post("././api/user/remove", {
            'q' : par
        })
        .then(function(data){
              console.log(data);
              deferred.resolve(data);
        })
        
        return deferred.promise;
    }
    
    this.promoteAdmin = function(par){
        var deferred = $q.defer();
        
        return $http.post("././api/user/op", {
            'q' : par
        })
        .then(function(data){
            console.log(data);
            deferred.resolve(data);
        })
        return deferred.promise;
    } 
    
  }])

.run(function(CurrentUserService) {});