angular.module('myApp.controllers').controller("dashomeController", function ($scope, $compile) {


  $scope.chartOne = function() {
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.onClick = function (points, evt) {
      console.log(points, evt);
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
    chart = "<div class='chart-header'>Titolo</div>"+
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
      chart = "<div class='chart-header'>Titolo</div>"+
              "<canvas id='pie' class='chart chart-pie'"+
              "chart-data='datatwo' chart-labels='labelstwo' chart-options='options'>"+
              "</canvas>";
      angular.element(document.getElementById('chartwo')).append($compile(chart)($scope));        
  }

});