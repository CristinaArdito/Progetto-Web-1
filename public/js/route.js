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

            // route for the about page
            .when('/signup', {
                templateUrl : 'views/signup.ejs',
                controller  : 'signupController'
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