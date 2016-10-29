'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.factory:mapService
 * @description
 * # mapService
 * Map service
 */
angular.module('loqalusClientApp').factory('mapService', ['$http', 'urlFactory', function ($http, urlFactory) {

    function getPins(lat, lng, dist) {
        var baseUrl = urlFactory.getBaseUrl() + "api/pins";
        var url = baseUrl + "?lat=" + lat + "&long=" + lng + "&dist=" + dist;
        // TODO have a time thing that will get the pins again after a ceratain amount of time. 
        return $http.get(url);
    }

    return {
        getPins: getPins,

    };
}]);