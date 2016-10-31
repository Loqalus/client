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
    var initialZoom = 0;
    var markers = markers || [];
    main.zoom = 15;
    var modalInstance;
    var pins = [];
    var pinsColors = ["FE7569", "3399ff", "66ff66"]
    var baseImageUrl = "/images/pin";
    var getPins = false;
    var timeouts = [];
    var notMoved = true;

    console.log("Grabbing location");
    var timeStart = new Date();

    geolocationSvc.getCurrentPosition().then(
      function(position){
        initMap(position);
        var timeEnd = new Date();
        var seconds = (timeEnd.getTime() - timeStart.getTime())/1000
        console.log("Getting the postition took " + seconds + " seconds");
      }
    );

    function computeRadius(map){
      var bounds = map.getBounds();

      var center = bounds.getCenter();
      var ne = bounds.getNorthEast();

      // r = radius of the earth in statute miles
      var r = 3963.0;  

      // Convert lat or lng from decimal degrees into radians (divide by 57.2958)
      var lat1 = center.lat() / 57.2958; 
      var lon1 = center.lng() / 57.2958;
      var lat2 = ne.lat() / 57.2958;
      var lon2 = ne.lng() / 57.2958;

      // distance = circle radius from center to Northeast corner of bounds
      var dis = r * Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1));
      return dis;
    }

    main.onMapOverlayCompleted = function(marker){
      var lat = marker.overlay.position.lat();
      var lng = marker.overlay.position.lng();
      newActionPage.setLatLng(lat, lng);
      marker.overlay.setMap(null);
      openModal(marker);
    }

    main.goToPage = function() {
      console.log('pin')
    }
 
    main.dragStart =  function(){
      console.log("Staring drag");
      getPins = false;
    }

    main.zoomChanged = function(){
      // for (var i=0; i<timeouts.length; i++) {
      //   $window.clearTimeout(timeouts[i]);
      // }

      // timeouts.push($window.setTimeout(function(){
      //   console.log("get the pins!");
      //   NgMap.getMap().then(function(map) {
      //     var newDistance = computeRadius(map);
      //     loadPins(map.center.lat(), map.center.lng(), newDistance, map);
      //   });
      // }, 1000));


    }

    main.dragEnd = function() {
    // console.log("Ending drag");



      for (var i=0; i<timeouts.length; i++) {
        $window.clearTimeout(timeouts[i]);
      }
      notMoved = false;

      timeouts.push($window.setTimeout(function(){
        console.log("get the pins!");
        NgMap.getMap().then(function(map) {
          var newDistance = computeRadius(map);
          loadPins(map.center.lat(), map.center.lng(), newDistance, map);
        });
      }, 1200));
  }

    function openModal(marker){

      if($window.localStorage.getItem('auth_token')){
          modalInstance = $uibModal.open({
            template: templateFactory.getCreatePinsOne(),
            size: 'lg',
            controller: 'modalOneCtrl',
            bindToController: true,
            controllerAs: 'vm'
         });
      }
      else{
          modalInstance = $uibModal.open({
            template: templateFactory.getMustSignIn(),
            size: 'md',
            controller: 'modalOneCtrl',
            bindToController: true,
            controllerAs: 'vm'
         });
          marker.overlay.setMap(null);
          console.log(marker);
        }

    }

    function clearMarkers(){
      console.log("Deleting markers");
      console.log(markers);

       for(var i = 0; i < markers.length; i++){
          markers[i].setMap(null); 
       } 
        markers = []; 
    }

    function loadPins(lat, lng, dist, map){
        clearMarkers();
        main.lat = lat;
        main.lng = lng;
        var dist = 1;
        var bounds = new google.maps.LatLngBounds();
        bounds.extend(new google.maps.LatLng(main.lat, main.lng));
        mapService.getPins(lat, lng, dist).success(function success(response){
          pins = response.pins;
          var blurbs = []
          var counter = 0;
          console.log(pins);
          for(var i in pins)
          {
            (function(key){
              // Only put 10 pins on map
              if(key < 11){
                bounds.extend(new google.maps.LatLng(pins[key].latitude, pins[key].longitude));
              }
              var imageNum = pins[key].action_type;
              var imageUrl = baseImageUrl + imageNum + ".png";
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
              markers.push(marker);

// "{{" + pins[key].description + "| limitTo: 140 }}{{"+  pins[key].description.length +  "> 140 ? '...' : ''}}"

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
        if(pins.length>0 && notMoved){
         map.fitBounds(bounds);
        }
        }).error(function error(response){
          console.log("Some error occured while getting pins.")
        });
    }

    function initMap(position){

      NgMap.getMap().then(function(map) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var dist = 0.2;
        loadPins(lat, lng, dist, map);
    });
  }
}]);
