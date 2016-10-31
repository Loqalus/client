'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:editProfileCtrl
 * @description
 * # editProfileCtrl
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp')
  .controller('editProfileCtrl', ['$window', '$http', 'urlFactory', '$uibModalInstance', 'userFactory', function($window, $http, urlFactory, $uibModalInstance, userFactory){
    var baseUrl = urlFactory.getBaseUrl();
    var vm = this;
    vm.interests = [];
    vm.allInterests = [];
    vm.interest = '';

    var setupProfile = function(){
      var url = baseUrl + "/api/users/" + $window.localStorage.getItem('user_id');
      $http.get(url).then(function(response){ 
        vm.user = response.data.user;
        vm.interests = response.data.interests;
      });
    };

    vm.loadTags = function(){
      var url = baseUrl+ "api/tag";
      $http.get(url).success(function(response){
        for(var k in response.tags){
          vm.allInterests.push(response.tags[k].name);
        }
      }).error(function(response){
        console.log(response);
      })
    };

    vm.removeInterest = function(tag){
      console.log(tag);
      var index = vm.interests.indexOf(tag);
      if(index > -1){
        vm.interests.splice(index);
      }
    }

    vm.addInterest = function(){
      vm.interests.push(vm.interest);
      vm.interest = '';
    };

      vm.close = function(){
    $uibModalInstance.close();
  }


  vm.deleteProf = function(){
      var user = {
        "name": vm.user.name,
        "bio": vm.user.bio,
        "tag_list": vm.interests 
      }
      console.log("bruh");

      var url = baseUrl+ "api/users/" + vm.user.id;

      var req = {
       method: 'DELETE',
       url: url,
       headers: {
         'Authorization': userFactory.getAuthToken()
       },
       data: { user: user }
      }

     $http(req).success(function(response){
        $uibModalInstance.close();
        userFactory.signOut();
        $window.location.href = "/";
      }).error(function(response){
        console.log(response);
      })    
  }



    vm.edit = function(){
      var user = {
        "name": vm.user.name,
        "bio": vm.user.bio,
        "tag_list": vm.interests 
      }

      var url = baseUrl+ "api/users/" + vm.user.id;

      var req = {
       method: 'PATCH',
       url: url,
       headers: {
         'Authorization': userFactory.getAuthToken()
       },
       data: { user: user }
      }

      $http(req).success(function(response){
        $uibModalInstance.close();
        $window.location.reload()
      }).error(function(response){
        console.log(response);
      })    
    }


    setupProfile();
    vm.loadTags();

}]);
