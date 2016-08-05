'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp')
  .controller('MainCtrl',  ['$scope', 'NgMap', 'geolocationSvc' , 'mapService', '$uibModal', 'templateFactory', 'newActionPage', '$compile', function ($scope, NgMap, geolocationSvc, mapService, $uibModal, templateFactory, newActionPage, $compile) {
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
        initDropPinButton(map);
        mapService.getPins(position.coords.latitude, position.coords.longitude, dist).success(function success(response){
          pins = response.pins;
          var blurbs = []
          var counter = 0;
          console.log(pins)
          for(var pin in pins)
          {
            (function(currentPin){
              console.log(currentPin);
              var imageColor = pinsColors[currentPin.action_type];
              var imageUrl = baseImageUrl + imageColor;
              var lat = currentPin.latitude;
              var lng = currentPin.longitude;
              var title = currentPin.title;

              // Create marker 
              var marker = new google.maps.Marker({
                title: title,
                position: new google.maps.LatLng(lat, lng),
                map: map,
                animation: google.maps.Animation.DROP,
                icon: imageUrl
              });

             var  content = document.createElement('div'),
                  button;
                  content.innerHTML='<h2 class="firstHeading">'+ title + '</h2> <br>'+
                                  '<div id="bodyContent">'+
                                  '<p>' + currentPin.description + '</p>'+
                                  '</div>';
                  button=content.appendChild(document.createElement('button'));
                  button.value='Learn More'
                  google.maps.event.addDomListener(button,'click', 
                    function(){
                      console.log(currentPin);
                    })
              // var idForBlurb = title;
              // var contentString = '<div ng-controller="MainCtrl as main" id="content">'+
              //                     '<div id="siteNotice">'+
              //                     '</div>'+
              //                     '<h2 id="firstHeading" class="firstHeading">'+ pins[i].title + '</h1>'+
              //                     '<div id="bodyContent">'+
              //                     '<p><b>'+ pins[i].title + '</b>' + pins[i].description + '</p>'+
              //                     '</div>'+'<button id="'+idForBlurb+'"' + 'onClick="main.goToPage()">' +'Learn More'+ '</button>'
              //                     +'</div>';

              var infowindow = new google.maps.InfoWindow({
                content: content
              });

              // blurbs.push(infowindow);


            // document.getElementById(pins[i].title).addEventListener("click", function(){
            //   console.log(pins[i]);
            // });
              // var compiledContent = $compile(contentString)($scope)


              // google.maps.event.addListener(marker, 'click', (function(marker, infowindow) {
              //     return function() {
              //         infowindow.open(map, marker);
              //     };
              // })(marker, infowindow));

                  // google.maps.event.addListener(infowindow, 'domready', function() {
                  //   console.log(idForBlurb)
                  //     document.getElementById(idForBlurb).addEventListener("click", function() {
                  //       console.log("bro");
                  //       console.log(idForBlurb);
                  // });
                  // });


            // google.maps.event.addListener(marker,'click', (function(marker,infowindow,map, blurbs){ 
            //     for(var j =0; j < blurbs.length; j++)
            //       {
            //           blurbs[j].close();
            //       }
            //       console.log(marker);
            //       console.log(infowindow);
            //     infowindow.open(map,marker);
            // })(marker,infowindow,map, blurbs));
            google.maps.event.addListener(marker, 'click', function () {
                infowindow.setOptions({
                    content: content,
                    map: map,
                    position: new google.maps.LatLng(lat, lng)
                });
            });
          //  counter++;
          //  if(counter < 10)
          //  {
          //   if(google.maps.geometry.spherical.computeDistanceBetween(latlngPos, theLatLng) < 25000)
          //   {
          //      bounds.extend(latlngPos);
          //   }
          //  }
          //  if(counter == 10 || counter == response.length)
          //  {
          //   map.fitBounds(bounds);
          //  }
          })(pin);
        }
        }).error(function error(response){
          console.log("Some error occured while getting pins.")
        });
    });
  }
}]);
