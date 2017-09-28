var pwApp = angular.module('pwApp');

pwApp.service('CurrentUserService', ['$q','$http', function ($q, $http) 
  {   // initialization
    var self = null;
    var mail = "";
    var isAdmin = false;

 
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

    this.getSelf = function(){
        if(this.isLogged){
            return mail;
        }else{
            return -1;
        }
    }

    this.isAdmin = function(){
        if(isAdmin == true) return true;
        else return false;
    }

    this.login = function(email, psw)
	    {
         var deferred = $q.defer();

        $http.post('././api/user/authenticate',
                    {'email':email, 'password':psw})
             .then(function(data) 
                 {
                  self = data.data.data.token;      // mi salvo l'utente corrente
                  mail = email;
                  isAdmin = data.data.data.admin;
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
         $http.post('././api/user/signup',
                    {'name':name, 'password':psw, 'email':email})
             .then(function(data) 
                 {
                  deferred.resolve(data);
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
            deferred.resolve(data);
        })
        return deferred.promise;
    } 
    
    this.update = function(data){
        var deferred = $q.defer();
        
        $http.post("././api/user/update", {
            'name' : data[0], 'password' : data[2], 'email' : data[1], 'emailP' : data[1]
        })
        .then(function(data){
            deferred.resolve(data);
        })
        return deferred.promise;
    }

    this.reminder = function(email, code){
        var deferred = $q.defer();

        $http.post("././api/user/reminderPush", {
            'e' : email, 'c' : parseInt(code)
        })
        .then(function(data){
           deferred.resolve(data);
        })

        return deferred.promise;
    }
  }])

.run(function(CurrentUserService) {});