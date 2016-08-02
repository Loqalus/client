'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:CrtConvoMdlCtrl
 * @description
 * # CrtConvoMdlCtrl
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp').controller('CrtConvoMdlCtrl', ['$scope', 'newActionPage', '$uibModalInstance', '$uibModal', function ($scope, newActionPage, $uibModalInstance, $uibModal) {

  var vm = this;
  vm.inHouse = true;
  vm.$onInit;
  vm.type;
  vm.close;
  vm.toggle;
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
    vm.convo.in_house = vm.inHouse;
    var loc = newActionPage.getLatLng();
    vm.convo.latitude = loc.lat;
    vm.convo.longitude = loc.lng;
    newActionPage.createConversation(vm.convo)
    .success(function (data, status, headers, config) {
    console.log("success");
    })
    .error(function (data, status, header, config) {
    console.log("error");
    });
  }

}]);