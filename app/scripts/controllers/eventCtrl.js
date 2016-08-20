'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:eventCtrl
 * @description
 * # eventCtrl
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp')
  .controller('eventCtrl', ['$scope', '$routeParams', '$http', '$window', function ($scope, $routeParams, $http, $window) {
  	var eventCtrl = this;
	var baseUrl = "http://localhost:8000/";
	eventCtrl.theEvent = {};
	eventCtrl.newComment = "";

	eventCtrl.disablePostComment = function(){
	  if($window.localStorage.getItem('user_id')){
	  	return false;
	  }
	  else{
	  	return true;
	  }
	};

	eventCtrl.addComment = function(){
	  var id = $window.localStorage.getItem('user_id')
	  var url = baseUrl + "api/events/comments"
	  var payload = {"id": $routeParams.id,
					  "comment": eventCtrl.newComment,
					  "user_id": id
					};
	  $http.post(url, payload).success(function success(response){
	  	eventCtrl.newComment = "";
	  	getComments();
	  }).error(function error(response) {
	  	console.log("Something went wrong");
	  	eventCtrl.newComment = "";
	  });
	};

	eventCtrl.cancelComment = function(){
	  eventCtrl.newComment = "";
	};

  	eventCtrl.Init = function(){
  	  var url = baseUrl + "api/event/" + $routeParams.id;
	  $http.get(url).success(function success(response){
	  	console.log(response);
	  	eventCtrl.theEvent = response.event;
	  }).error(function error(response) {
	  	console.log("Something went wrong");
	  });
	  getComments();
  	};

  	function getComments(){
	  var url = baseUrl + "api/events/" + $routeParams.id + "/comments";
	  $http.get(url).success(function success(response){
	  	console.log(response.comments[0]);
	  	eventCtrl.comments = response.comments;
	  }).error(function error(response) {
	  	console.log("Something went wrong");
	  });
  	}

  	eventCtrl.Init();
  }]);
