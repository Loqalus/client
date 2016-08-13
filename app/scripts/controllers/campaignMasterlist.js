'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:campaignMasterlist
 * @description
 * # campaignMasterlist
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp')
  .controller('campaignMasterlist', ['$window', '$http', function($window, $http){
    var vm = this;
		vm.allCampaigns = [];

  	var setupCampaigns = function(){
     var url = "http://localhost:8000/api/campaigns"
  		$http.get(url).then(function(response){ 
				vm.allCampaigns = response.data.campaigns;
				console.log(response.data)
  		});
  	};

  	setupCampaigns();
  }]);
