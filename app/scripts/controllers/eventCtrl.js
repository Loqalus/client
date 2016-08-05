'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:eventCtrl
 * @description
 * # eventCtrl
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp')
  .controller('eventCtrl', ['$scope', function ($scope) {
  	var vm = this;

  	vm.Init = function(){
      console.log("Bro");
  	}

  }]);
