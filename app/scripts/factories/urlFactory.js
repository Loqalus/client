'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.factory:urlFactory
 * @description
 * # urlFactory
 * Current Action page. 
 */
angular.module('loqalusClientApp').factory('urlFactory', [function () {

  var baseUrl = "http://localhost:8000/";
  // var baseUrl = "https://api.loqalus.com/";


  function getBaseUrl(){
    return baseUrl;
  }

  return {
    getBaseUrl: getBaseUrl
  };
}]);