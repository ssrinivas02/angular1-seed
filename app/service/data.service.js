'use strict';

angular.module('myApp.dataservice', [])
.factory("DataService", DataService);

DataService.$inject = ['$http'];

function DataService($http) {
    var service = {
        getData: getData
    };

    function getData() {
        //return $http.get('assets/data.json');
        $http.get('assets/data.json').success(function(data){
            console.log("loading...");
            console.log(data);
            return data;
        });
    }
    return service;
};