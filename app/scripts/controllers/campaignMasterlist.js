'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:campaignMasterlist
 * @description
 * # campaignMasterlist
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp')
  .controller('campaignMasterlist', ['$window', '$http', 'urlFactory', function($window, $http, urlFactory){
    var vm = this;
		vm.allCampaigns = [];

    var baseUrl = urlFactory.getBaseUrl();


  	var setupCampaigns = function(){
     var url = baseUrl + "api/campaigns"
  		$http.get(url).then(function(response){ 
				vm.allCampaigns = response.data.campaigns;
				console.log(response.data)
  		});
  	};

  	setupCampaigns();
  }]);
