'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.factory:userFactory
 * @description
 * # userFactory
 * Current user.
 */
angular.module('loqalusClientApp').factory('userFactory', ['$http', function ($http) {

  var user = {
    id: null,
    name: null,
    email: null,
    bio: null,
    location: null,
    avatar: null,
    background: null,
    auth: null
  };

  var baseUrl = "http://localhost:8000/";

  function createUser() {
    var url = baseUrl + "api/users";
    var config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return $http.post(url, user, config);
  }

  function getAuthToken(){
    return user.auth;
  }

  function getUserId() {
    return user.id;
  }

  function signIn() {

  }

  function signOut() {

  }

  // function setUser(){

  // }

  return {
    createUser: createUser,
    getAuthToken: getAuthToken,
    getUserId: getUserId,
    signIn: signIn,
    signOut: signOut
  };
}]);