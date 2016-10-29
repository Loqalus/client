'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:profileCtrl
 * @description
 * # profileCtrl
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp')
  .controller('profileCtrl', ['$window', '$http', 'urlFactory', '$uibModal', 'templateFactory', function($window, $http, urlFactory, $uibModal, templateFactory){
    var baseUrl = urlFactory.getBaseUrl();
    var profileCtrl = this;
    profileCtrl.interests = [];

  	var setupProfile = function(){
      var url = baseUrl + "/api/users/" + $window.localStorage.getItem('user_id');
  		$http.get(url).then(function(response){ 
				profileCtrl.user = response.data.user;
				profileCtrl.interests = response.data.interests;
				console.log(response.data);
  		});
  	};

    profileCtrl.editProfile = function(){
      var modal = $uibModal.open({
      template: templateFactory.getEditProfileModal(),
      size: 'lg',
      controller: 'editProfileCtrl',
      bindToController: true,
      controllerAs: 'vm'
    });
    }

      profileCtrl.deleteProfile = function() {
          var modal = $uibModal.open({
      template: templateFactory.getDeleteProfileModal(),
      size: 'md',
      controller: 'editProfileCtrl',
      bindToController: true,
      controllerAs: 'vm'
    });
  }

    profileCtrl.canEdit = function(){
      if( profileCtrl.user === 'undefined'){
        return false;
      }
      else{
        return profileCtrl.user.id === parseInt($window.localStorage.getItem("user_id"));
      }

    }



  	setupProfile();

}]);
