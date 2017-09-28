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
                templateUrl : 'views/front-end/home.ejs',
                controller  : 'mainController'
            })

            // route for the login page
            .when('/login', {
                templateUrl : 'views/front-end/login.ejs',
                controller  : 'loginController'
            })
            .when('/who', {
                templateUrl : 'views/front-end/who.ejs'
            })
            .when('/useraccount', {
                templateUrl : 'views/front-end/user.ejs',
                controller  : 'userController'
            })
            .when('/cart', {
                templateUrl : 'views/front-end/cart.ejs',
                controller  : 'cartController'
            })
            .when('/categ', {
                templateUrl : 'views/front-end/categ.ejs',
                controller  : 'categoryController'
            })
            // route for the about page
            .when('/signup', {
                templateUrl : 'views/front-end/signup.ejs',
                controller  : 'signupController'
            })
            .when('/dashboard', {
                templateUrl : 'views/admin/dashome.ejs',
                controller  : 'dashomeController'
            }) 
            .when('/where', {
                templateUrl : 'views/front-end/where.ejs',
                controller  : 'whereController'
            })
            .when('/singleproduct', {
                templateUrl : 'views/front-end/singleproduct.ejs',
                controller  : 'singleController'
            })   
            .when('/offers', {
                templateUrl : 'views/front-end/offers.ejs',
                controller  : 'productsController'
            })         
            .when('/offerts', {
                templateUrl : 'views/admin/products.ejs',
                controller  : 'productsController'
            })
            .when('/orders', {
                templateUrl : 'views/admin/order.ejs',
                controller  : 'orderController'
            })
            .when('/orderSuccess', {
                templateUrl : 'views/admin/orderS.ejs',
                controller  : 'orderSuccessController'
            })
            .when('/addProduct', {
                templateUrl : 'views/admin/addProduct.ejs',
                controller  : 'addProductController'
            })
            .when('/editProduct', {
                templateUrl : 'views/admin/editProduct.ejs',
                controller  : 'editProductController'
            })
            .when('/editSupplier', {
                templateUrl : 'views/admin/editSupplier.ejs',
                controller  : 'editSupplierController'
            })
            .when('/user', {
                templateUrl : 'views/admin/showUser.ejs',
                controller  : 'showUserController'
            })
            .when('/supplier', {
                templateUrl : 'views/admin/showSupplier.ejs',
                controller  : 'showSupplierController'
            })
            .when('/addSupplier', {
                templateUrl : 'views/admin/addSupplier.ejs',
                controller  : 'addSupplierController'
            })
            .when('/searchprod', {
                templateUrl : 'views/front-end/searchForm.ejs',
                controller  : 'searchProductHomeController'
            })
            .when('/useraccount', {
                templateUrl : 'views/front-end/user.ejs',
                controller  : 'userEditController'
            })
            .when('/ordered', {
                templateUrl : 'views/admin/ordered.ejs',
                controller  : 'orderedController'
            })
            .when('/orderedUser', {
                templateUrl : 'views/admin/orderedUser.ejs',
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
        })
        .state('loggedHomeAdmin', {
            url: '/',
            templateUrl: 'views/indexLoginAdmin.ejs',
            controller: 'mainController'
        });
    })

    //Controller delle UI-VIEW
    .controller('MyCtrl', ['$state', 'CurrentUserService', function($state, CurrentUserService) {

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