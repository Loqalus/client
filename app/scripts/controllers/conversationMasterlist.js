'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:convoMasterlist
 * @description
 * # convoMasterlist
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp')
  .controller('conversationMasterlist', ['$scope', '$window', '$http', function($scope, $window, $http){

		$scope.allConversations = [];

  	var setupConversations = function(){
  		$http.get("http://loqalus.herokuapp.com/api/conversations.json").then(function(response){ 
				$scope.allConversations = response.data.message;
				console.log(response.data)
  		});
  	};

  	setupConversations();


    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
