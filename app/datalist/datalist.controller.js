'use strict';

angular.module('myApp.datalist', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/datalist', {
    templateUrl: 'partials/datalist.html',
    controller: 'datalistCtrl'
  });
}])

.controller('datalistCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.headerColumns = [];
    $scope.datalist = [];
    $scope.sortDirection;
    $scope.sortByColumn;
    $http.get('assets/data.json').success(function(data){
        console.log(data);
        $scope.datalist = data;
        createHeaderColumns(); 
    });    
    var createHeaderColumns = function() {
        var dataObj = $scope.datalist[0];
        console.log(dataObj);
        for (var key in dataObj) {
            console.log(key);
            $scope.headerColumns.push({ name: key })
            console.log($scope.headerColumns);
        }
    }    

}]);