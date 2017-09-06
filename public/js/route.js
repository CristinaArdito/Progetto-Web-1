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
                templateUrl : 'views/who.ejs'
            })
            .when('/useraccount', {
                templateUrl : 'views/user.ejs',
                controller  : 'userController'
            })
            .when('/cart', {
                templateUrl : 'views/cart.ejs',
                controller  : 'cartController'
            })
            .when('/categ', {
                templateUrl : 'views/categ.ejs',
                controller  : 'categController'
            })
            // route for the about page
            .when('/signup', {
                templateUrl : 'views/signup.ejs',
                controller  : 'signupController'
            })
            .when('/dashboard', {
                templateUrl : 'views/dashome.ejs',
                controller  : 'dashomeController'
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
                controller  : 'productsController'
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
            })
            .when('/user', {
                templateUrl : 'views/showUser.ejs',
                controller  : 'showUserController'
            })
            .when('/supplier', {
                templateUrl : 'views/showSupplier.ejs',
                controller  : 'showSupplierController'
            })
            .when('/addSupplier', {
                templateUrl : 'views/addSupplier.ejs',
                controller  : 'addSupplierController'
            })
        

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