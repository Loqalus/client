'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:eventMasterlist
 * @description
 * # eventMasterlist
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp')
  .controller('eventMasterlist', function ['$scope', '$window', '$http', function($scope, $window, $http){

  	$scope.allEvents = [];

  	var setupEvents = function(){
  		$http.get("http://loqalus.herokuapp.com/api/events").then(function(response){ 
				$scope.allEvents = response.data;
				console.log(response.data);
  		});
  	};

		setupEvents();


    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
