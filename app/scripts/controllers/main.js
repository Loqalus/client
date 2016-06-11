'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp')
  .controller('MainCtrl',  function ($scope, NgMap, geolocationSvc) {
  	var main = this;
  	main.zoom = 8;

  	geolocationSvc.getCurrentPosition().then(
  	function(position){
  			initMap(position);
  		}
  	);

  	function initMap(position){
	  	NgMap.getMap().then(function(map) {
	    console.log(position);
	    main.lat = position.coords.latitude;
	    main.lng = position.coords.longitude;
	    console.log(map);
	    console.log('shapes', map.shapes);
	  });
  }


    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
