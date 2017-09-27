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
                controller  : 'categoryController'
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
            .when('/editProduct', {
                templateUrl : 'views/editProduct.ejs',
                controller  : 'editProductController'
            })
            .when('/editSupplier', {
                templateUrl : 'views/editSupplier.ejs',
                controller  : 'editSupplierController'
            })
            .when('/user', {
                templateUrl : 'views/showUser.ejs',
                controller  : 'showUserController'
            })
            .when('/ordered', {
                templateUrl : 'views/ordered.ejs',
                controller  : 'orderedController'
            })
            .when('/supplier', {
                templateUrl : 'views/showSupplier.ejs',
                controller  : 'showSupplierController'
            })
            .when('/addSupplier', {
                templateUrl : 'views/addSupplier.ejs',
                controller  : 'addSupplierController'
            })
            .when('/searchprod', {
                templateUrl : 'views/searchForm.ejs',
                controller  : 'searchProductHomeController'
            })
            .when('/useraccount', {
                templateUrl : 'views/user.ejs',
                controller  : 'userEditController'
            })
            .when('/ordered', {
                templateUrl : 'views/ordered.ejs',
                controller  : 'orderedController'
            })
            

        //======================================================================
        // ROUTER DELLA VIEW UI
        $stateProvider

        .state('home', {
            url: '/',
            templateUrl: 'views/indexLogout.ejs',
            controller: 'mainController'
        })

        .state('dashboard', {
           url: '/dashboard',
           templateUrl: 'views/admin/dashboard.ejs',
           controller: 'dashController'
        })
        
        .state('loggedHome', {
            url: '/',
            templateUrl: 'views/indexLogin.ejs',
            controller: 'mainController'
        });
    })

    //Controller delle UI-VIEW
    .controller('MyCtrl', ['$state', 'CurrentUserService', function($state, CurrentUserService) {

    console.log(CurrentUserService.isLogged());
    if(CurrentUserService.isLogged() == true){
        $state.go('loggedHome');
    }
    else{ 
        $state.go('home');
    }
    }])

    //Silenzia errori di codice del router delle view, non è influente per il funzionamento
    .config(['$qProvider', function ($qProvider) {
            $qProvider.errorOnUnhandledRejections(false);
        }]);