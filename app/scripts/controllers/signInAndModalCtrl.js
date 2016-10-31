'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:signInAndModalCtrl
 * @description
 * # signInAndModalCtrl
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp')
  .controller('signInAndModalCtrl', ['userFactory', '$uibModalInstance', '$window', '$http', 'urlFactory', '$scope', function (userFactory, $uibModalInstance, $window, $http, urlFactory, $scope) {
    var vm = this;
    var baseUrl = urlFactory.getBaseUrl();
    vm.email;
    vm.password;
    vm.name;
    vm.newEmail;
    vm.newPassword;
    vm.newPasswordConfirm;
    vm.bio;
    vm.allInterests = [];
    vm.data = {error: false};

    vm.Init = function(){
      vm.theirInterests = [];
      vm.loadTags();
      vm.error = false;
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

    vm.addInterest = function(){
      console.log("interest added")
      vm.theirInterests.push(vm.interest);
      vm.interest = '';
    };

    vm.login = function(){
      console.log("logging in");
      var session = {
        "session": {
          "email": vm.email,
          "password": vm.password
        }
      }
      userFactory.signIn(session).success(function(response){
        userFactory.setUser(response);
        $window.location.reload();
        console.log(response);
        vm.close();
      }).error(function(error){
        vm.data.error = true;
        console.log(error);
      });
    };

    vm.signUp = function(){
      console.log("registering");
      console.log(vm.theirInterests);
      var newUser = {
        "user": {
          "name": vm.name,
          "email": vm.newEmail,
          'password': vm.newPassword,
          'password_confirmation': vm.newPassword,
          "bio": vm.bio,
          "tag_list": vm.theirInterests
        }
      }
      userFactory.createUser(newUser).success(function(response){
        userFactory.setUser(response);
        //tag user

        $window.location.reload();
        console.log(response);
      }).error(function(error){
        console.log(error);
      });
    };

    vm.close = function(){
    $uibModalInstance.close();
  };

    vm.Init();

  }]);
