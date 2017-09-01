var pwApp = angular.module('pwApp');

pwApp.service('CurrentUserService', ['$q','$http', function ($q, $http) 
  {   // initialization
    console.log('ciao sono il CurrentUserService');
    var self = this;
    this.utenteLoggato;  // conterrà l'utente loggato


 
 
/* ========================================
    FUNCTIONS
================================================*/


    this.login = function(email, psw)
	    {
         var deferred = $q.defer();
         $http.post('././api/user/authenticate',
                    {'email':email, 'password':psw})
             .then(function(data) 
                 {
                  console.log(data);
                  self.utenteLoggato = data;      // mi salvo l'utente corrente
                  console.log(utenteLoggato);
                  deferred.resolve(data);
                 })
             .catch(function(err, code) 
                 {  
                  self.utenteLoggato = undefined; // resetto l'utente
                  deferred.reject(err);
                 });
        return deferred.promise; 
    }      

    this.signup = function(name, psw, email)
	    {
         var deferred = $q.defer(); 
         $http.post('././api/user/signup',
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

    this.removeUser = function(par1,par2){
        var deferred = $q.defer();
        
        $http.post("././api/user/remove", {
            'name': par1, 'email' : par2
        })
        .then(function(data){
               deferred.resolve(data.data);
        })
        
        return deferred.promise;
    }
    
    this.promoteAdmin = function(par1,par2){
        var deferred = $q.defer();
        
        $http.post("././api/user/promote", {
            'name': par1, 'email' : par2
        })
        .then(function(data){
               deferred.resolve(data.data);
        })
        
        return deferred.promise;
    } 
    
  }])

.run(function(CurrentUserService) {});