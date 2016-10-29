'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:navController
 * @description
 * # navController
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp')
  .controller('navController', ['userFactory', 'templateFactory', '$uibModal', '$window', function(userFactory, templateFactory, $uibModal, $window){
    var nav = this;
    nav.isLoggedIn;
    nav.openSignUpModal;

    function init(){
        var auth = userFactory.getAuthToken();
        if(auth){
            nav.isLoggedIn = true;
        }
        else{
            nav.isLoggedIn = false;
        }
    }

    nav.openSignUpModal = function(){
	    $uibModal.open({
	        template: templateFactory.getSignInModal(),
	        size: 'lg',
	        controller: 'signInAndModalCtrl',
	        bindToController: true,
	        controllerAs: 'vm'
	      });
    }

    nav.openRegisterModal = function(){
	    $uibModal.open({
	        template: templateFactory.getRegisterModal(),
	        size: 'lg',
	        controller: 'signInAndModalCtrl',
	        bindToController: true,
	        controllerAs: 'vm'
	      });
    }


    nav.signOut = function(){
    	console.log("signing out");
    	userFactory.signOut().success(function(response){
            console.log("signed out");
            console.log(response);
            $window.location.href="/";
        }).error(function(response){
            console.log(response);
        });
    }

    nav.isLoggedIn = function(){
    	if(userFactory.getAuthToken()){
    		return true;
    	}
    	else{
    		return false;
    	}
    }

    init();
  }]);
