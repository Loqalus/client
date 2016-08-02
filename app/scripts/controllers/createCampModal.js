'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:CrtCampMdlCtrl
 * @description
 * # CrtCampMdlCtrl
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp').controller('CrtCampMdlCtrl', ['$scope', 'newActionPage', '$uibModalInstance', '$uibModal', function ($scope, newActionPage, $uibModalInstance, $uibModal) {

  var vm = this;
  vm.inHouse = true;
  vm.$onInit;
  vm.type;
  vm.close;
  vm.toggle;
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
    newActionPage.createCampaign(vm.campaign)
    .success(function (data, status, headers, config) {
    console.log("success");
    })
    .error(function (data, status, header, config) {
    console.log("error");
    });
  }
}]);