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
  	main.zoom = 15;
    var pins = [];
    var dist = 1;
    var pinsColors = ["FE7569", "3399ff", "66ff66"]
    var baseImageUrl = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|";

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
          for(var i = 0; i < pins.length; i ++)
          {
            var imageColor = pinsColors[pins[i].action_type];
            var imageUrl = baseImageUrl + imageColor;
            var lat = pins[i].latitude;
            var lng = pins[i].longitude;
            var title = pins[i].title;
            var contentString = '<div id="content">'+
                                '<div id="siteNotice">'+
                                '</div>'+
                                '<h2 id="firstHeading" class="firstHeading">'+ pins[i].title + '</h1>'+
                                '<div id="bodyContent">'+
                                '<p><b>'+ pins[i].title + '</b>' + pins[i].description + '</p>'+
                                '</div>'+
                                '</div>';

            var infowindow = new google.maps.InfoWindow({
              content: contentString
            });

            var marker = new google.maps.Marker({
              title: title,
              position: new google.maps.LatLng(lat, lng),
              map: map,
              animation: google.maps.Animation.DROP,
              icon: imageUrl
            });

            google.maps.event.addListener(marker,'click', (function(marker,infowindow){ 
              return function() {
                infowindow.open(map,marker);
              };
            })(marker,infowindow));  
          }
          }).then(function error(response){
            console.log("Some error occured while getting pins.")
          });
    });
  }
}]);
