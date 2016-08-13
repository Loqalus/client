'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:eventCtrl
 * @description
 * # eventCtrl
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp')
  .controller('eventCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
  	var vm = this;
	var baseUrl = "http://localhost:8000/";
	vm.theEvent = {};

  	vm.Init = function(){
  	  		console.log($routeParams);
  	  var url = baseUrl + "api/event/" + $routeParams.id;
	  $http.get(url).success(function success(response){
	  	console.log(response);
	  	vm.theEvent = response.event;
	  }).error(function error(response) {
	  	console.log("Something went wrong");
	  });
  	}

  	vm.Init();

  }]);
