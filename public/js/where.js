var pwApp = angular.module('myApp.controllers')

pwApp.controller('whereController', ['$scope', 'Markers', function($scope, Markers) {
  $scope.map = { 
    center: { latitude: 43.1396, longitude: 13.0688 }, 
    zoom: 15 
  };
  $scope.markers = Markers;
}])
.factory("Markers", function(){
  var Markers = [
    {
      "id": "0",
      "coords": {
        "latitude": "43.1396",
        "longitude": "13.0688"
      },
      "window": {
        "title": "Camerino, MC"
      }
    }
  ];
  return Markers;
});