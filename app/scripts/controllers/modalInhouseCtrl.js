'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:modalInhouseCtrl
 * @description
 * # modalInhouseCtrl
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp')
  .controller('modalInhouseCtrl', ['$scope', 'newActionPage', '$uibModalInstance', '$uibModal', 'templateFactory', function ($scope, newActionPage, $uibModalInstance, $uibModal, templateFactory) {
    var vm = this;
    vm.inHouse = true;
    vm.$onInit;
    vm.type;
    vm.close;
    vm.toggle;
    vm.sourcedClass = 'startanaction';
    vm.inHouseClass = 'startanaction';
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

  vm.next = function(){
    $uibModalInstance.close();
    openModal();
  }

  vm.disable = function(){
    console.log(newActionPage.getType())
    if(newActionPage.getType() === 'Campaign' && newActionPage.getInHouse())
      return true;
    else if(vm.sourcedClass === 'startanaction' && vm.inHouseClass === 'startanaction')
      return true;
    else 
      return false;
  }

    function changeCss(type){
    console.log(type);
    if (type === 'sourced'){
      vm.sourcedClass = 'startanactionChosen';
      vm.inHouseClass = 'startanaction';
    }
    if (type === 'inHouse'){
      vm.sourcedClass = 'startanaction';
      vm.inHouseClass = 'startanactionChosen';
    }
  }


  vm.setType = function(type) {
    console.log(type);
    changeCss(type);
    newActionPage.setInHouse(type);
  }


  function openModal(){
    var modal;
    var crtl;
    var type = newActionPage.getType();
    if(type === 'Event')
    {
      modal = templateFactory.getEventModal();
      crtl = 'CrtEventMdlCtrl';
    }
    if(type === 'Campaign')
    {
      modal = templateFactory.getCampaignModal();
      crtl = 'CrtCampMdlCtrl';
    }
    if(type === 'Conversation')
    {
      modal = templateFactory.getConversationModal();
      crtl = 'CrtConvoMdlCtrl';
    }
    var modalInstance = $uibModal.open({
      template: modal,
      size: 'lg',
      controller: crtl,
      bindToController: true,
      controllerAs: 'vm'
    });
  }


    vm.$onInit = function(){
      vm.type = newActionPage.getType();
    }

  }]);
