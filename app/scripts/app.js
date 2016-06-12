'use strict';

/**
 * @ngdoc overview
 * @name loqalusClientApp
 * @description
 * # loqalusClientApp
 *
 * Main module of the application.
 */
angular
  .module('loqalusClientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMap'
  ])
  .config(function ($routeProvider) {


    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
    .when('/events', {
      templateUrl: 'views/events.html',
      controller: 'eventMasterlist',
      controllerAs: 'events'
    })
    .when('/conversations', {
      templateUrl: 'views/conversations.html',
      controller: 'conversationMasterlist',
      controllerAs: 'conversations'
    })
    .when('/campaigns', {
      templateUrl: 'views/campaigns.html',
      controller: 'campaignMasterlist.html',
      controllerAs: 'campaigns'
    })

      // Add a .when action for events, eventMasterlist.html
      // eventMasterlistCtrl

      .otherwise({
        redirectTo: '/'
      });
  });
