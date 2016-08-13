'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:conversationCtrl
 * @description
 * # conversationCtrl
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp')
  .controller('conversationCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
  	var vm = this;
	var baseUrl = "http://localhost:8000/";
	vm.convo = {};

  	vm.Init = function(){
  		console.log($routeParams);
  	  var url = baseUrl + "api/conversation/" + $routeParams.id;
	  $http.get(url).success(function success(response){
	  	console.log(response);
	  	vm.convo =  response.conversation;
	  }).error(function error(response) {
	  	console.log("Something went wrong");
	  });
  	}

  	vm.Init();

  }]);
