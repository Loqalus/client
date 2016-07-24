angular.module('loqalusClientApp')
  .controller('profile', ['$scope', '$window', '$http', function($scope, $window, $http){

  	var setupProfile = function(){
      var url = "http://localhost:8000/api/user"
  		$http.get(url).then(function(response){ 
				$scope.user = response.data.user;
				console.log(response.data);
  		});
  	};



  }]);
