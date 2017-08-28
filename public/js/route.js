// create the module and name it pwApp
angular.module('myApp.controllers', []); 
angular.module('myApp.services', []);

angular.module('pwApp', ['myApp.services', 'myApp.controllers', 'ngRoute','ui.router'])
.run(function(){

})
.config(function($routeProvider,  $stateProvider, $urlRouterProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'views/home.ejs',
                controller  : 'mainController'
            })

            // route for the login page
            .when('/login', {
                templateUrl : 'views/login.ejs',
                controller  : 'loginController'
            })
            .when('/who', {
                templateUrl : 'views/who.ejs',
                controller  : 'whoController'
            })
            .when('/cart', {
                templateUrl : 'views/cart.ejs',
                controller  : 'cartController'
            })
            // route for the about page
            .when('/signup', {
                templateUrl : 'views/signup.ejs',
                controller  : 'signupController'
            })
            .when('/where', {
                templateUrl : 'views/where.ejs',
                controller  : 'whereController'
            })
            .when('/singleproduct', {
                templateUrl : 'views/singleproduct.ejs',
                controller  : 'singleController'
            })   
            .when('/offers', {
                templateUrl : 'views/offers.ejs',
                controller  : 'offersController'
            })         
            .when('/offerts', {
                templateUrl : 'views/products.ejs',
                controller  : 'productsController'
            })
            .when('/orders', {
                templateUrl : 'views/order.ejs',
                controller  : 'orderController'
            })
            .when('/orderSuccess', {
                templateUrl : 'views/orderS.ejs',
                controller  : 'orderSuccessController'
            })
            .when('/addProduct', {
                templateUrl : 'views/addProduct.ejs',
                controller  : 'addProductController'
            });
        

        //======================================================================
        // ROUTER DELLA VIEW UI
        console.log("UI ROUTER1");
        console.log("UI ROUTER2");
        $stateProvider

        .state('home', {
            url: '/',
            templateUrl: 'views/index2.ejs',
            controller: 'mainController'
        })

        .state('dashboard', {
           url: '/dashboard',
           templateUrl: 'views/admin/dashboard.ejs',
           controller: 'mainController'
        });
    })

    //Controller delle UI-VIEW
    .controller('MyCtrl', function($state) {
    $state.go('home')
    })

    //Silenzia errori di codice del router delle view, non è influente per il funzionamento
    .config(['$qProvider', function ($qProvider) {
            $qProvider.errorOnUnhandledRejections(false);
        }]);