'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:eventMasterlist
 * @description
 * # eventMasterlist
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp')
  .controller('eventMasterlist', ['$scope', '$window', '$http', function($scope, $window, $http){

  	$scope.allEvents = [];

  	var setupEvents = function(){
      var url = "http://localhost:8000/api/events"
  		$http.get(url).then(function(response){ 
				$scope.allEvents = response.data.events;
				console.log(response.data);
  		});
  	};

		setupEvents();


  }]);
