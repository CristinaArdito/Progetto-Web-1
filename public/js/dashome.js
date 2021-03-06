angular.module('myApp.controllers')
.controller("dashomeController", ['$scope', '$compile', 'CurrentUserService', 'ProductsHandleService', '$location', 'OrderService',
function ($scope, $compile, CurrentUserService, ProductsHandleService, $location, OrderService) {

  if(CurrentUserService.isLogged() == false || CurrentUserService.isAdmin() == false){
    alert("Non puoi accedere a questa area, autenticati come amministratore e riprova");
    $location.path("/");
  }

  $scope.chartOne = function() {
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.onClick = function (points, evt) {
      //console.log(points, evt);
    };
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
    $scope.options = {
      scales: {
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          },
          {
            id: 'y-axis-2',
            type: 'linear',
            display: true,
            position: 'right'
          }
        ]
      }
    };

    var chart = "";
    chart = "<div class='chart-header'>Vendite ultimo semestre</div>"+
    "<canvas id='line' class='chart chart-line' chart-data='data'"+
    "chart-labels='labels' chart-series='series' chart-options='options'"+
    "chart-dataset-override='datasetOverride' chart-click='onClick'>"+
    "</canvas>";
    angular.element(document.getElementById('chart')).append($compile(chart)($scope));
  }

  $scope.chartTwo = function() {
      $scope.labelstwo = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
      $scope.datatwo = [300, 500, 100];

      var chart = "";
      chart = "<div class='chart-header'>Ordini</div>"+
              "<canvas id='pie' class='chart chart-pie'"+
              "chart-data='datatwo' chart-labels='labelstwo' chart-options='options'>"+
              "</canvas>";
      angular.element(document.getElementById('chartwo')).append($compile(chart)($scope));        
  }

  $scope.chartThree = function() {
    $scope.labelsthree = ['2010', '2011', '2012', '2013', '2014', '2015', '2016'];
    $scope.seriesthree = ['Series A', 'Series B'];
    $scope.datathree = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.colorsthree = ['rgba(247,70,74,1)', 'rgba(70,191,189,1)'];

    var chart = "";
    chart = "<div class='chart-header'>Vendite totali</div>"+
            "<canvas id='bar' class='chart chart-bar'"+
            "chart-data='datathree' chart-labels='labelsthree' chart-series='seriesthree'"+  
            "chart-colors='colorsthree'>"+
            "</canvas";
    angular.element(document.getElementById('charthree')).append($compile(chart)($scope));
    
  }

  $scope.chartFour = function() {

    $scope.labelsfour =["Smartphone", "Hardware", "Software", "Notebook", "Monitor", "Tablet", "Server"];
    $scope.datafour = [
      [65, 59, 90, 81, 56, 55, 40],
      [28, 48, 40, 19, 96, 27, 100]
    ];
    $scope.colorsfour = ['rgba(49,237,133,1)', 'rgba(64,49,237,1)'];

    var chart = "";
    chart = "<div class='chart-header'>Bestseller</div>"+
            "<canvas id='radar' class='chart chart-radar'"+
            "chart-data='datafour' chart-options='options' chart-labels='labelsfour'"+
            "chart-colors='colorsfour'>"+
             "</canvas>"; 
    angular.element(document.getElementById('chartfour')).append($compile(chart)($scope));

  }
  
  $scope.countUser = function(){
    
    CurrentUserService.getAllUser()
    .then(function(data){

      var number = "<h2>"+data.data.length+"</h2>New Users";
      angular.element(document.getElementById('userCount')).append($compile(number)($scope));
    })
  }

  $scope.countProducts = function(){
    
    ProductsHandleService.getAllProducts()
    .then(function(data){
      var number = "<h2>"+data.length+"</h2>Products";
      angular.element(document.getElementById('productCount')).append($compile(number)($scope));
    })
  }

  $scope.countOrders = function(){
    OrderService.getAllOrder()
    .then(function(value){
      var number = "<h2>"+value.data.data.length+"</h2>Orders";
      angular.element(document.getElementById('ordersCount')).append($compile(number)($scope));
    })
  }

}])
.controller("dashController", ['$scope', 'DataService' , function($scope, DataService){
    
    $scope.resetData = function(){
      DataService.reset();
    }
}]);