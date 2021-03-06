'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:eventMasterlist
 * @description
 * # eventMasterlist
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp')
  .controller('eventMasterlist', ['$window', '$http', 'urlFactory', function($window, $http, urlFactory){
    var vm = this;
    var baseUrl = urlFactory.getBaseUrl();
    vm.allEvents = [];
    vm.style = "z-depth-3";
      vm.myInterval = 5000;
  vm.noWrapSlides = false;
  vm.active = 0;
  var slides = vm.slides = [];
  var currIndex = 0;

    var setupEvents = function(){
      var url = baseUrl + "api/events"
      $http.get(url).then(function(response){ 
        vm.allEvents = response.data.events;
        console.log(vm.allEvents);
      });
    };

    vm.enter = function(){
      vm.style = "z-depth-4";
    }

    vm.leave = function(){
      vm.style = "z-depth-3";
    }



  vm.addSlide = function() {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      image: 'images/backdrop' + (currIndex) + '.jpg',
      text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
      id: currIndex++
    });
  };

  vm.randomize = function() {
    var indexes = generateIndexesArray();
    assignNewIndexesToSlides(indexes);
  };

  for (var i = 0; i < 3; i++) {
    vm.addSlide();
  }

  // Randomize logic below

  function assignNewIndexesToSlides(indexes) {
    for (var i = 0, l = slides.length; i < l; i++) {
      slides[i].id = indexes.pop();
    }
  }

  function generateIndexesArray() {
    var indexes = [];
    for (var i = 0; i < currIndex; ++i) {
      indexes[i] = i;
    }
    return shuffle(indexes);
  }

  // http://stackoverflow.com/questions/962802#962890
  function shuffle(array) {
    var tmp, current, top = array.length;

    if (top) {
      while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
    }

    return array;
  }

    setupEvents();


  }]);
