'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:navController
 * @description
 * # navController
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp')
  .controller('navController', ['$scope', '$http', 'userFactory', function($scope, $http, userFactory){
    var nav = this;
    nav.signedIn = false;
    nav.bro= "yes";

  }]);
