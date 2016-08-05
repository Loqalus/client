'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:conversationCtrl
 * @description
 * # conversationCtrl
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp')
  .controller('conversationCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
  	var vm = this;

  	vm.Init = function(){
      console.log($routeParams);
  	}

  }]);
