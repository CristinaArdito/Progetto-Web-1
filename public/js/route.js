// create the module and name it pwApp
angular.module('myApp.controllers', []); 
angular.module('myApp.services', []); 

angular.module('pwApp', ['myApp.services', 'myApp.controllers', 'ngRoute'])
.run(function(){

})
.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'views/dashboard.ejs',
                controller  : 'mainController'
            })

            // route for the login page
            .when('/login', {
                templateUrl : 'views/login.ejs',
                controller  : 'loginController'
            })

            // route for the about page
            .when('/signup', {
                templateUrl : 'views/signup.ejs',
                controller  : 'signupController'
            })

            .when('/prodotti', {
                templateUrl : 'views/products.ejs',
                controller  : 'productsController'
            });

    });
