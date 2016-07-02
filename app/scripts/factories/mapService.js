angular.module('loqalusClientApp').factory('mapService', ['$http',function ($http) {

    'use strict';

    function getPins(lat, lng, dist) {
        var baseUrl = "http://localhost:8000/api/pins";
        lng=-88.997594
        lat = 40.504088;
        var url = baseUrl + "?lat=" + lat + "&long=" + lng + "&dist=" + dist;
        // TODO have a time thing that will get the pins again after a ceratain amount of time. 
        return $http.get(url);
    }

    return {
        getPins: getPins,

    };
}]);