'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.factory:actionPage
 * @description
 * # actionPage
 * Current Action page. 
 */
angular.module('loqalusClientApp').factory('actionPage', [function () {

  var actionPage = {

  };


  function setPage(page){
    actionPage = page;
  }

  function getPage() {
    return page;
  }

  return {
    setPage: setPage,
    getPage: getPage
  };
}]);