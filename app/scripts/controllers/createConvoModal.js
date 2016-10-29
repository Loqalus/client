'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:CrtConvoMdlCtrl
 * @description
 * # CrtConvoMdlCtrl
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp').controller('CrtConvoMdlCtrl', ['$scope', 'newActionPage', '$uibModalInstance', '$uibModal', '$window', '$http', 'urlFactory',function ($scope, newActionPage, $uibModalInstance, $uibModal, $window, $http, urlFactory) {

  var vm = this;
  vm.inHouse = newActionPage.getInHouse();;
  var baseUrl = urlFactory.getBaseUrl();
  vm.$onInit;
  vm.type;
  vm.close;
  vm.toggle;
  vm.allTags = [];
  vm.convo = {
    title: null,
    description: null,
    user_id: null,
    latitude: null,
    longitude: null,
    link: null,
    in_house: null,
    action_type: 2
  };

    vm.addTag = function(){
      vm.convoTags.push(vm.tag);
      vm.tag = '';
    };

  vm.loadTags = function(){
  vm.convoTags = [];
  var url = baseUrl + "api/tag";
  $http.get(url).success(function(response){
    for(var k in response.tags){
      vm.allTags.push(response.tags[k].name);
    }
  }).error(function(response){
    console.log(response);
  })
};

  vm.toggle = function(){
    return vm.inHouse;
  };

  vm.close = function(){
    $uibModalInstance.close();
  }

  vm.test = function(){
    console.log(vm.inHouse);
  }

  vm.$onInit = function(){
    vm.type = newActionPage.getType();
  }

  vm.create = function(){
    vm.convo.in_house = vm.inHouse;
    var loc = newActionPage.getLatLng();
    vm.convo.latitude = loc.lat;
    vm.convo.user_id = $window.localStorage.getItem("user_id");
    vm.convo.longitude = loc.lng;
    vm.convo.tag_list = vm.convoTags;
    newActionPage.createConversation(vm.convo)
    .success(function (data, status, headers, config) {
      vm.close();
      $window.location.href = "/#/conversation/" + data.message.id;
      console.log("success");
    })
    .error(function (data, status, header, config) {
      console.log("error");
    });
  }

  vm.loadTags();
}]);