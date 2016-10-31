angular.module('loqalusClientApp')
  .controller('campaign', ['$scope', '$window', '$http', 'urlFactory', function($scope, $window, $http, urlFactory){

    $scope.campaign = [];
    var baseUrl = urlFactory.getBaseUrl();

    var setupCampaign = function(){
      $http.get(baseUrl + "api/campaigns/" + campaignId + ".json").then(function(response){ 
        $scope.campaign = response.data.campaigns;
        $scope.campaignId = campaignId
        console.log(response.data)
      });
    };

    setupConversations();
  }]);
