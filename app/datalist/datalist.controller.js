'use strict';

angular.module('myApp.datalist', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/datalist', {
    templateUrl: 'partials/datalist.html',
    controller: 'datalistCtrl',
    resolve: {
        dataList: function(DataService) {
            //console.log(DataService.getData())
            return DataService.getData().success(function(response){
                return response.data;
            });
        }
    } 
  });
}])

.controller('datalistCtrl', ['$scope', '$http', 'dataList', function($scope, $http, dataList) {
    $scope.headerColumns = [];
    $scope.datalist = dataList.data;
    $scope.sortByColumn = 'name';
    $scope.sortDirection = true;
    $scope.goToPage = {name: 'Category List Page', link:"#!/categorylist"};

    console.log(dataList.data)
    //Fetching data
    // $http.get('assets/data.json').success(function(response){
    //     populateGridData(response.data);
    // });
    var populateGridData = function(data) {
        //$scope.datalist = data;

        //Preparing Header name
        var dataObj = $scope.datalist[0];
        for (var key in dataObj) {
            $scope.headerColumns.push({ name: key })
        }
    }
    populateGridData();

    $scope.onSortHandler = function(header) {
        $scope.sortByColumn = header.name;
        var columnDirection = !$scope.sortDirection;
        $scope.sortDirection = !$scope.sortDirection;
        header.sortDirection = columnDirection;
    }

}]);