'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:conversationCtrl
 * @description
 * # conversationCtrl
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp')
  .controller('conversationCtrl', ['$scope', '$routeParams', '$http', '$window', 'urlFactory', '$uibModal', 'templateFactory', function ($scope, $routeParams, $http, $window, urlFactory, $uibModal, templateFactory) {
  	var vm = this;
    var baseUrl = urlFactory.getBaseUrl();
	vm.convo = {};
	vm.newComment = "";
	vm.tags = [];
	vm.isOwner = false;

	vm.disablePostComment = function(){
	  if($window.localStorage.getItem('user_id')){
	  	return false;
	  }
	  else{
	  	return true;
	  }
	};

   vm.deleteAction = function(){
   	$window.localStorage.setItem('convo_to_delete', vm.convo.id);	
	var modal = $uibModal.open({
      template: templateFactory.getDeleteConvoModal(),
      size: 'md',
      controller: 'editActionCtrl',
      bindToController: true,
      controllerAs: 'vm'
    });
	}

	 vm.editAction = function(){
	  $window.localStorage.setItem('action_type', "conversation");
	  $window.localStorage.setItem('convo_to_edit', vm.convo.id);
	var modal = $uibModal.open({
      template: templateFactory.getEditConvoModal(),
      size: 'md',
      controller: 'editActionCtrl',
      bindToController: true,
      controllerAs: 'vm'
    });
	}

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
		vm.tags = response.tags;
		if(response.conversation.user_id === $window.localStorage.getItem("user_id")){
	  		vm.isOwner = true;
	  	}
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
