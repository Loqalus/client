angular.module('loqalusClientApp').factory('mapService', ['$http',function ($http) {

    'use strict';

    function getPins(lat, lng, dist) {
        var baseUrl = "localhost:8000/api/pins";
        var url = baseUrl + "?lat=" + lat + "&long=" + lng + "&dist=" + dist;

        var pins = pins || pins;
        // TODO have a time thing that will get the pins again after a ceratain amount of time. 

        if (pins) {

            return pins;
        } else {

            $http.get(url).then(function success(response){
                pins = response.pins;
            }, 
            function error(response){
                console.log("Some error occured while getting the pins.")
            });
        }

        return pins
    }

    return {
        getPins: getPins,

    };
}]);