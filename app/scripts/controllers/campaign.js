angular.module('loqalusClientApp')
  .controller('campaign', ['$scope', '$window', '$http', function($scope, $window, $http){

		$scope.campaign = [];

  	var setupCampaign = function(){
  		$http.get("http://localhost:8000/api/campaigns/" + campaignId + ".json").then(function(response){ 
				$scope.campaign = response.data.campaigns;
        $scope.campaignId = campaignId
				console.log(response.data)
  		});
  	};

  	setupConversations();
  }]);
