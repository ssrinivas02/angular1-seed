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
    $scope.sortByColumn = 'name';
    $scope.sortDirection = true;
    $scope.goToPage = {name: 'Category List Page', link:"#!/categorylist"};

    //Fetching data
    $http.get('assets/data.json').success(function(data){
        populateGridData(data);
    });
    

    var populateGridData = function(data) {
        $scope.datalist = data;

        //Preparing Header name
        var dataObj = $scope.datalist[0];
        for (var key in dataObj) {
            $scope.headerColumns.push({ name: key })
        }
    }

    $scope.onSortHandler = function(header) {
        $scope.sortByColumn = header.name;
        var columnDirection = !$scope.sortDirection;
        $scope.sortDirection = !$scope.sortDirection;
        header.sortDirection = columnDirection;
    }

}]);