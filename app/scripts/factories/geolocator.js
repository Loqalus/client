'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.factory:geolocationSvc
 * @description
 * # geolocationSvc
 * Location service
 */
angular.module('loqalusClientApp').factory('geolocationSvc', ['$q', '$window', function ($q, $window) {

    function getCurrentPosition() {
        var deferred = $q.defer();

        if (!$window.navigator.geolocation) {
            deferred.reject('Geolocation not supported.');
        } else {
            $window.navigator.geolocation.getCurrentPosition(
                function (position) {
                    deferred.resolve(position);
                },
                function (err) {
                    deferred.reject(err);
                }, 
                {
                  enableHighAccuracy: true, 
                  maximumAge        : 30000, 
                  timeout           : 27000
                }
                );
        }

        return deferred.promise;
    }

    return {
        getCurrentPosition: getCurrentPosition
    };
}]);