'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.factory:userFactory
 * @description
 * # userFactory
 * Current user.
 */
angular.module('loqalusClientApp').factory('userFactory' , ['$http', '$window', 'urlFactory', function ($http, $window, urlFactory) {

  var baseUrl = urlFactory.getBaseUrl();

  function createUser(newUser) {
    var url = baseUrl + "api/users";
    var config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return $http.post(url, newUser, config);
  }

  function signIn(session) {
    var url = baseUrl + "api/sessions";
    var config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return $http.post(url, session, config);
  }

  function signOut() {
    var id = $window.localStorage.getItem('user_id');
    $window.localStorage.removeItem('name');
    $window.localStorage.removeItem('bio');
    $window.localStorage.removeItem('auth_token');
    $window.localStorage.removeItem('email');
    $window.localStorage.removeItem('user_id');
    return $http.delete(baseUrl+ 'api/sessions/'+ id);
  }

  function setUser(userObj){
    $window.localStorage.setItem('user_id', userObj["id"]);
    $window.localStorage.setItem('name', userObj["name"]);
    $window.localStorage.setItem('bio', userObj["bio"]);
    $window.localStorage.setItem('auth_token', userObj["auth_token"]);
    $window.localStorage.setItem('email', userObj["email"]);
  }

  function getAuthToken(){
    return $window.localStorage.getItem('auth_token');
  }


  function getUserId(){
    return $window.localStorage.getItem('user_id');
  }

  return {
    createUser: createUser,
    signIn: signIn,
    signOut: signOut,
    setUser: setUser,
    getAuthToken: getAuthToken,
    getUserId: getUserId

  };
}]);