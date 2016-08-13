'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:profileCtrl
 * @description
 * # profileCtrl
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp')
  .controller('profileCtrl', ['$window', '$http', function($window, $http){

var profileCtrl = this;

  	var setupProfile = function(){
      var url = "http://localhost:8000/api/user"
  		$http.get(url).then(function(response){ 
				profileCtrl.user = response.data.user;
				console.log(response.data);
  		});
  	};

}]);
