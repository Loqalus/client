'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:ModalonecontrollerCtrl
 * @description
 * # ModalonecontrollerCtrl
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp')
  .controller('modalOneCtrl', ['$scope', 'newActionPage', '$uibModalInstance', '$uibModal', 'templateFactory', function ($scope, newActionPage, $uibModalInstance, $uibModal, templateFactory) {
	var vm = this;
	vm.$onInit;
	vm.test;
	vm.close;
	vm.setType;
	vm.eventClass = 'startanaction';
	vm.campaignClass = 'startanaction';
	vm.convoClass = 'startanaction';

	vm.$onInit = function() {
		newActionPage.clean();
 	}

 	vm.test = function(){
 		console.log("bro");
 	}

 	vm.close = function(){
 		$uibModalInstance.close();
 	}

 	function changeCss(type){
 		console.log(type);
 		if (type === 'Event'){
	  	vm.eventClass = 'startanactionChosen';
	  	vm.campaignClass = 'startanaction';
	  	vm.convoClass = 'startanaction';
 		}
 		if (type === 'Conversation'){
	  	vm.eventClass = 'startanaction';
	  	vm.campaignClass = 'startanaction';
	  	vm.convoClass = 'startanactionChosen';
 		}
  	if (type === 'Campaign'){
	  	vm.eventClass = 'startanaction';
	  	vm.campaignClass = 'startanactionChosen';
	  	vm.convoClass = 'startanaction';
 		}
 	}

	vm.setType = function(type) {
		console.log(type);
		changeCss(type);
		newActionPage.setType(type)
	}

	vm.disable = function(){
		console.log(newActionPage.getType())
		if(newActionPage.getType())
			return false;
		else
			return true;
	}

	vm.next = function(){
		$uibModalInstance.close();
		openModal();
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

}]);
