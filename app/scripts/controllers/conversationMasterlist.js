'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:convoMasterlist
 * @description
 * # convoMasterlist
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp')
  .controller('conversationMasterlist', ['$scope', '$window', '$http', 'urlFactory', function($scope, $window, $http, urlFactory){
    var vm = this;
		vm.allConversations = [];
  var baseUrl = urlFactory.getBaseUrl();

  	var setupConversations = function(){
      var url = baseUrl + "api/conversations";
  		$http.get(url).then(function(response){ 
				vm.allConversations = response.data.conversations;
				console.log(response.data)
  		});
  	};

  	setupConversations();
  }]);
