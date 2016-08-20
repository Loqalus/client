'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:eventMasterlist
 * @description
 * # eventMasterlist
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp')
  .controller('eventMasterlist', ['$window', '$http', function($window, $http){
    var vm = this;
  	vm.allEvents = [];
    vm.style = "z-depth-3";

  	var setupEvents = function(){
      var url = "http://localhost:8000/api/events"
  		$http.get(url).then(function(response){ 
				vm.allEvents = response.data.events;
  		});
  	};

    vm.enter = function(){
      vm.style = "z-depth-4";
    }

    vm.leave = function(){
      vm.style = "z-depth-3";
    }

		setupEvents();


  }]);
