'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp')
  .controller('MainCtrl',  ['$scope', 'NgMap', 'geolocationSvc' , 'mapService', '$uibModal', 'templateFactory', 'newActionPage', '$window', '$rootScope', function ($scope, NgMap, geolocationSvc, mapService, $uibModal, templateFactory, newActionPage, $window, $rootScope) {
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

    main.onMapOverlayCompleted = function(marker){
        var lat = marker.overlay.position.lat();
        var lng = marker.overlay.position.lng();
        newActionPage.setLatLng(lat, lng);
        var signedIn = true;
        if(signedIn)
        {
           openModal();
        }
        else
        {
            alert("Please Create an Account Or Sign In");
            marker.overlay.map = null;
        }
    }

    main.goToPage = function() {
      console.log('pin')
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
        var bounds = new google.maps.LatLngBounds();
        mapService.getPins(position.coords.latitude, position.coords.longitude, dist).success(function success(response){
          pins = response.pins;
          var blurbs = []
          var counter = 0;
          console.log(pins.length)
          for(var i in pins)
          {
            (function(key){
              if(key < 11){
                bounds.extend(new google.maps.LatLng(pins[key].latitude, pins[key].longitude));
              }
              var imageColor = pinsColors[pins[key].action_type];
              var imageUrl = baseImageUrl + imageColor;
              var lat = pins[key].latitude;
              var lng = pins[key].longitude;
              var title = pins[key].title;

              // Create marker 
              var marker = new google.maps.Marker({
                title: title,
                position: new google.maps.LatLng(lat, lng),
                map: map,
                animation: google.maps.Animation.DROP,
                icon: imageUrl
              });

             var  content = document.createElement('div'), button;
             content.innerHTML='<h2 class="firstHeading">'+ title + '</h2> <br>'+
                                  '<div id="bodyContent">'+
                                  '<p>' + pins[key].description + '</p>'+
                                  '</div>';
              content.class="container-fluid";

              if(pins[key].in_house){
                button=content.appendChild(document.createElement('button'));
                button.innerHTML='Learn More';
                google.maps.event.addDomListener(button,'click', function(){
                  var type;
                  if (pins[key].action_type === 0)
                    type = '/#/event/'
                  if (pins[key].action_type === 1)
                    type = '/#/campaign/'
                  if (pins[key].action_type === 2)
                    type = '/#/conversation/'
                  $window.location.href = type + pins[key].id
                })
              }
              else
              {
                button=content.appendChild(document.createElement('a'));
                button.innerHTML='Go to external link';
                button.href=pins[key].link;
                console.log(pins[key].link);
                button.target='_blank';
              }

              var infowindow = new google.maps.InfoWindow({
                content: content
              });

              blurbs.push(infowindow);

            google.maps.event.addListener(marker, 'click', function () {
              for(var k in blurbs){
                blurbs[k].close();
              }
                infowindow.setOptions({
                    content: content,
                    map: map,
                    position: new google.maps.LatLng(lat, lng)
                });
            });
          })(i);
        }
        map.fitBounds(bounds);
        }).error(function error(response){
          console.log("Some error occured while getting pins.")
        });
    });
  }
}]);
