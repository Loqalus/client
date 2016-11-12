'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.factory:newActionPage
 * @description
 * # newActionPage
 * New action page information for modals. 
 */
angular.module('loqalusClientApp').factory('newActionPage', ['$http', 'userFactory', 'urlFactory' , function ($http, userFactory, urlFactory) {

  var type = null;
  var inHouse = null;
  var baseUrl = urlFactory.getBaseUrl();
  var lat = null;
  var lng = null;

  function createEvent(newEvent) {
    newEvent.in_house = inHouse;

    if(!inHouse){
      var re = new RegExp("^(http|https)://", "i");
      if(!re.test(newEvent.link)){
        newEvent.link = "http://"+ newEvent.link;
      }
    }
    var payload = {
        event: newEvent
    }
    var user_id = userFactory.getUserId();
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
    convo.in_house = inHouse;

    if(!inHouse){
      var re = new RegExp("^(http|https)://", "i");
      if(!re.test(convo.link)){
        convo.link = "http://"+ convo.link;
      }
    }
    var payload = {
        conversation: convo
    }
    var user_id = userFactory.getUserId();
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
    campaign.in_house = inHouse;

    if(!inHouse){
      var re = new RegExp("^(http|https)://", "i");
      if(!re.test(campaign.link)){
        campaign.link = "http://"+ campaign.link;
      }
    }
    var payload = {
        campaign: campaign
    }
    var user_id = userFactory.getUserId();
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

  function setInHouse(inHouseType)
  {    
    if (inHouseType === 'sourced'){
      inHouse = false;
    }
    if (inHouseType === 'inHouse'){
      inHouse = true;
    }

  }

  function getInHouse(){
    return inHouse;
  }

  return {
    createEvent: createEvent,
    createConversation: createConversation,
    createCampaign: createCampaign,
    setType: setType,
    getType: getType,
    clean: clean,
    setLatLng: setLatLng,
    getLatLng: getLatLng,
    setInHouse: setInHouse,
    getInHouse: getInHouse
  };
}]);