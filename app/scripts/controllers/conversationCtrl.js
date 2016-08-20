'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:conversationCtrl
 * @description
 * # conversationCtrl
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp')
  .controller('conversationCtrl', ['$scope', '$routeParams', '$http', '$window', function ($scope, $routeParams, $http, $window) {
  	var vm = this;
	var baseUrl = "http://localhost:8000/";
	vm.convo = {};
	vm.newComment = "";

	vm.disablePostComment = function(){
	  if($window.localStorage.getItem('user_id')){
	  	return false;
	  }
	  else{
	  	return true;
	  }
	};

	vm.addComment = function(){
	  var id = $window.localStorage.getItem('user_id')
	  var url = baseUrl + "api/conversations/comments"
	  var payload = {"id": $routeParams.id,
					  "comment": vm.newComment,
					  "user_id": id
					};
	  $http.post(url, payload).success(function success(response){
	  	 vm.getComments();
	  	 vm.newComment = "";
	  }).error(function error(response) {
	  	console.log("Something went wrong");
	  	vm.newComment = "";
	  });
	};

	vm.cancelComment = function(){
	  vm.newComment = "";
	};

  	vm.Init = function(){
  		console.log($routeParams);
  	  var url = baseUrl + "api/conversation/" + $routeParams.id;
	  $http.get(url).success(function success(response){
	  	console.log(response);
	  	vm.convo =  response.conversation;
	  }).error(function error(response) {
	  	console.log("Something went wrong");
	  });
	  vm.getComments();

  	}

  	vm.getComments = function(){
 	  var url = baseUrl + "api/conversations/" + $routeParams.id + "/comments";
	  $http.get(url).success(function success(response){
	  	console.log(response.comments);
	  	vm.comments = response.comments;
	  }).error(function error(response) {
	  	console.log("Something went wrong");
	  });
  	}

  	vm.Init();

  }]);
