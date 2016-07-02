'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp')
  .controller('MainCtrl',  ['$scope', 'NgMap', 'geolocationSvc' , 'mapService', function ($scope, NgMap, geolocationSvc, mapService) {
  	var main = this;
  	main.zoom = 8;
    var pins = [];
    var dist = 1;

  	geolocationSvc.getCurrentPosition().then(
  	function(position){
  			initMap(position);
  		}
  	);

  	function initMap(position){
	  	NgMap.getMap().then(function(map) {
	    main.lat = position.coords.latitude;
	    main.lng = position.coords.longitude;
      var dist = 1;
      mapService.getPins(position.coords.latitude, position.coords.longitude, dist).then(function success(response){
        pins = response.data.pins;
      }).then(function error(){
        console.log("Some error occured while getting pins.")
      });
      console.log(pins);
	  });
  }
  }]);
