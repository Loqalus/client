'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp')
  .controller('MainCtrl',  ['$scope', 'NgMap', 'geolocationSvc' , 'mapService', '$uibModal', 'templateFactory', 'newActionPage', function ($scope, NgMap, geolocationSvc, mapService, $uibModal, templateFactory, newActionPage) {
  	var main = this;
  	main.zoom = 15;
    var modalInstance;
    var pins = [];
    var dist = 1;
    var pinsColors = ["FE7569", "3399ff", "66ff66"]
    var baseImageUrl = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|";

  	geolocationSvc.getCurrentPosition().then(
  	function(position){
  			initMap(position);
  		}
  	);

    function initDropPinButton(map){
      var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: null,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.BOTTOM_CENTER,
            drawingModes: [
              google.maps.drawing.OverlayType.MARKER,
            ]
        },
        markerOptions: {fillColor: '#000000',
          fillOpacity: 1,
          strokeWeight: 5,
          clickable: false,
          editable: true,
        }
      });
      drawingManager.setMap(map);
       google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
        var latlngOfActionToCreate = event.overlay.getPosition()

        var lat = latlngOfActionToCreate.lat();
        var lng = latlngOfActionToCreate.lng();
        newActionPage.setLatLng(lat, lng);
        var signedIn = true;
        if(signedIn)
        {
           openModal();
        }
        else
        {
            alert("Please Create an Account Or Sign In");
            event.overlay.setMap(null);
        }
      });
    }

    function openModal(){
      modalInstance = $uibModal.open({
        template: templateFactory.getCreatePinsOne(),
        size: 'lg',
        controller: 'modalOneCtrl',
        bindToController: true,
        controllerAs: 'vm'
      });
    }

  	function initMap(position){

	  	NgMap.getMap().then(function(map) {

  	    main.lat = position.coords.latitude;
  	    main.lng = position.coords.longitude;
        var dist = 1;
        initDropPinButton(map);
        mapService.getPins(position.coords.latitude, position.coords.longitude, dist).success(function success(response){
          pins = response.pins;
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
        }).error(function error(response){
          console.log("Some error occured while getting pins.")
        });
    });
  }
}]);
