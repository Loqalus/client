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
      var url = "localhost:8000/api/conversations"
  		$http.get(url).then(function(response){ 
				$scope.allConversations = response.data.conversations;
				console.log(response.data)
  		});
  	};

  	setupConversations();
  }]);
