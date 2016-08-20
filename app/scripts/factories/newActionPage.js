'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.factory:newActionPage
 * @description
 * # newActionPage
 * New action page information for modals. 
 */
angular.module('loqalusClientApp').factory('newActionPage', ['$http', 'userFactory', function ($http, userFactory) {

  var type = null;
  var baseUrl = "http://localhost:8000/";
  var auth;
  var user_id;
  user_id = 1;
  var lat = null;
  var lng = null;

  function createEvent(newEvent) {
    var payload = {
        event: newEvent
    }
    var url = baseUrl + "api/users/" + user_id + "/events";
    var auth = userFactory.getAuthToken();
    var config = {
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json'
      }
    }
    return $http.post(url, payload, config);
  }

  function createConversation(convo) {
    var payload = {
        conversation: convo
    }
    var url = baseUrl + "api/users/" + user_id + "/conversations";
    var auth = userFactory.getAuthToken();
    var config = {
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json'
      }
    }
    return $http.post(url, payload, config);
  }

  function createCampaign(campaign) {
    var payload = {
        campaign: campaign
    }
    var url = baseUrl + "api/users/" + user_id + "/campaigns";
    var auth = userFactory.getAuthToken();
    var config = {
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json'
      }
    }
    return $http.post(url, payload, config);
  }

  function setType(actionType) {
    type = actionType;
  }

  function getType() {
    return type;
  }

  function setLatLng(latitdue, longitude) {
    lat = latitdue;
    lng = longitude;
  }

  function getLatLng() {
    var data = {
        lat: lat,
        lng: lng
    };
    return data;
  }

  function clean() {
    type = null;
  }

  return {
    createEvent: createEvent,
    createConversation: createConversation,
    createCampaign: createCampaign,
    setType: setType,
    getType: getType,
    clean: clean,
    setLatLng: setLatLng,
    getLatLng: getLatLng
  };
}]);