'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:convoMasterlist
 * @description
 * # convoMasterlist
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp')
  .controller('conversationMasterlist', ['$scope', '$window', '$http', 'urlFactory', function($scope, $window, $http, urlFactory){
    var vm = this;
    vm.allConversations = [];

        vm.style = "z-depth-3";
      vm.myInterval = 5000;
  vm.noWrapSlides = false;
  vm.active = 0;
  var slides = vm.slides = [];
  var currIndex = 0;
  vm.images = [];

  var baseUrl = urlFactory.getBaseUrl();

    var setupConversations = function(){
      var url = baseUrl + "api/conversations";
      $http.get(url).then(function(response){ 
        vm.allConversations = response.data.conversations;
        console.log(response.data)
        vm.setImages();
      });
    };


    vm.enter = function(){
      vm.style = "z-depth-4";
    }

    vm.leave = function(){
      vm.style = "z-depth-3";
    }

  vm.addImages = function() {
    var newWidth = 600 + slides.length + 1;
    for(var i = 1; i < 7; i++){
    vm.images.push({
      image: 'images/small' + i + '.jpg',
      text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
      id: i
    });
  }
  };

  vm.setImages = function(){

    for(var i = 0; i < vm.allConversations.length; i ++ ){
      var num = Math.floor(Math.random() * (7 - 1)) + 1;

      vm.allConversations[i].tempImage =  'images/small' + num + '.jpg';
    }
    console.log(vm.allConversations);
  }

  vm.addSlides = function() {
    var newWidth = 600 + slides.length + 1;
    for(var i = 1; i < 2; i++){
    slides.push({
      image: 'images/large' + 4 + '.jpg',
      text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
      id: i
    });
  }
  };

  vm.randomize = function() {
    var indexes = generateIndexesArray();
    assignNewIndexesToSlides(indexes);
  };


    vm.addSlides();
    vm.addImages();

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


    setupConversations();
  }]);
