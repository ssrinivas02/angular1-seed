'use strict';

angular.module('myApp.categorylist', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/categorylist', {
    templateUrl: 'partials/datalist.html',
    controller: 'categorylistCtrl',
    resolve: {
        dataList: function(DataService) {
            return DataService.getData().success(function(response) {
                return response.data;
            })
        }
    }
  });
}])

.controller('categorylistCtrl', ['$scope', '$http', 'dataList', function($scope, $http, dataList) {
    $scope.headerColumns = [];
    $scope.datalist = dataList.data;
    $scope.sortByColumn = 'name';
    $scope.sortDirection = true;
    $scope.goToPage = {name: 'Data List Page', link:"#!/datalist"};

    //Fetching data
    // $http.get('assets/data.json').success(function(data){
    //     populateGridData(data);
    // });
    

    var populateGridData = function(data) {
        
        //preparing category header names
        var keysList = [{
            name: 'name'
        }];

        
        data.forEach((value) => {
            
            var exist = keysList.filter((item) => {
                return item.name === value.category
            })

            if (exist.length === 0) {
                keysList.push({ name: value.category })
            }
        });
        
        $scope.headerColumns = keysList;

        //console.log($scope.headerColumns);
        //preparing data based on category
        var groupData = data.reduce(function (groups, item) {
            var val = item['name'];
            groups[val] = groups[val] || [];
            groups[val].push(item);
            return groups;
        }, {});
        //console.log("groupData");
        //console.log(groupData);

        $scope.datalist = Object.keys(groupData).map((value) => {
            //console.log( value);
            var item = {
                name: value
            }
            for (var i = 1; i < keysList.length; i++) {
                var category = groupData[value].filter((group) => {
                    return group.category === keysList[i].name
                })

                if (category.length) {
                    item[keysList[i].name] = category[0].amount;
                } else {
                    item[keysList[i].name] = null;
                }

            }
            //console.log( item);
            return item;
        });
        //console.log($scope.datalist);
        //$scope.datalist = data;
    }

    populateGridData(dataList.data);
    
    $scope.onSortHandler = function(header) {
        $scope.sortByColumn = header.name;
        var columnDirection = !$scope.sortDirection;
        $scope.sortDirection = !$scope.sortDirection;
        header.sortDirection = columnDirection;
    }

}]);