'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:modalTwoCtrlCtrl
 * @description
 * # modalTwoCtrlCtrl
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp')
  .controller('modalTwoCtrl', ['$scope', 'newActionPage', '$uibModalInstance', '$uibModal', function ($scope, newActionPage, $uibModalInstance, $uibModal) {
  	var vm = this;
    vm.inHouse = true;
  	vm.$onInit;
    vm.type;
    vm.close;
    vm.toggle;
    $scope.blah = "het";

    vm.toggle = function(){
      return $scope.inHouse;
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

  }]);
