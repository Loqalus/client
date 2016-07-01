// 'use strict';

// /**
//  * @ngdoc function
//  * @name loqalusClientApp.controller:convoMasterlist
//  * @description
//  * # convoMasterlist
//  * Controller of the loqalusClientApp
//  */
// angular.module('loqalusClientApp')
//   .controller('campaignMasterlist', ['$scope', '$window', '$http', function($scope, $window, $http){

// 		$scope.allCampaigns = [];

//   	var setupCampaigns = function(){
//      var url = "localhost:8000/api/campaigns"
//   		$http.get(url).then(function(response){ 
// 				$scope.allConversations = response.data.campaigns;
// 				console.log(response.data)
//   		});
//   	};

//   	setupConversations();


//     this.awesomeThings = [
//       'HTML5 Boilerplate',
//       'AngularJS',
//       'Karma'
//     ];
//   }]);
