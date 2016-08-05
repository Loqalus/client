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
    'ngMap',
    'ui.bootstrap'
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
      controller: 'campaignMasterlist',
      controllerAs: 'campaigns'
    })
    .when('/profile', {
      templateUrl: 'views/profile.html',
      controller: 'profile',
      controllerAs: 'profiles'
    })
    .when('/campaign/:id', {
      templateUrl: 'views/campaign.html',
      controller: 'campaign',
      controllerAs: 'campaign'
    })
    .when('/conversation/:id', {
      templateUrl: 'views/conversation.html',
      controller: 'conversationCtrl',
      controllerAs: 'conversationCtrl'
    })
    .when('/event/:id', {
      templateUrl: 'views/event.html',
      controller: 'eventCtrl',
      controllerAs: 'eventCtrl'
    })
      .otherwise({
        redirectTo: '/'
      });
  });
