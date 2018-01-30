'use strict';

angular.module('myApp.dataservice', [])
.factory("DataService", DataService);

DataService.$inject = ['$http'];

function DataService($http) {
    var service = {
        getData: getData
    };

    function getData() {
        return $http.get('assets/data.json');
        
    }
    return service;
};