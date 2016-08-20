'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:CrtCampMdlCtrl
 * @description
 * # CrtCampMdlCtrl
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp').controller('CrtCampMdlCtrl', ['$scope', 'newActionPage', '$uibModalInstance', '$uibModal', '$window', '$http', function ($scope, newActionPage, $uibModalInstance, $uibModal, $window, $http) {

  var vm = this;
  vm.inHouse = true;
  vm.$onInit;
  vm.type;
  vm.close;
  vm.toggle;
  vm.allTags = [];
  vm.campaign = {
    title: null,
    description: null,
    user_id: null,
    latitude: null,
    longitude: null,
    link: null,
    in_house: null,
    action_type: 1
  };


    vm.addTag = function(){
      console.log("interest added")
      console.log(vm.tag);
      vm.campTags.push(vm.tag);
      console.log(vm.eventTags);
      vm.tag = '';
    };

  vm.loadTags = function(){
  vm.campTags = [];
  var url = "http://localhost:8000/api/tag";
  $http.get(url).success(function(response){
    for(var k in response.tags){
      vm.allTags.push(response.tags[k].name);
    }
    console.log(vm.allTags);
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
    console.log(newActionPage.getType());
  }

  vm.create = function(){
    vm.campaign.in_house = vm.inHouse;
    var loc = newActionPage.getLatLng();
    vm.campaign.latitude = loc.lat;
    vm.campaign.longitude = loc.lng;
    vm.campaign.tag_list = vm.campTags;
    newActionPage.createCampaign(vm.campaign)
    .success(function (data, status, headers, config) {
      vm.close();
      $window.location.href = "/#/campaign/" + data.message.id;
      console.log("success");
    })
    .error(function (data, status, header, config) {
    console.log("error");
    });
  }

  vm.loadTags();
}]);