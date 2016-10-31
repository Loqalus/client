'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:editActionCtrl
 * @description
 * # editActionCtrl
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp')
  .controller('editActionCtrl', ['$window', '$http', 'urlFactory', '$uibModalInstance', 'userFactory', function($window, $http, urlFactory, $uibModalInstance, userFactory){
    var baseUrl = urlFactory.getBaseUrl();
    var vm = this;
    vm.convo = {};
    vm.theEvent = {};
    vm.tags = [];
    vm.allTags = [];
    vm.mytime = new Date();
    vm.dt = new Date();

  vm.close = function(){
    $uibModalInstance.close();
  }

      vm.loadTags = function(){
      var url = baseUrl+ "api/tag";
      $http.get(url).success(function(response){
        for(var k in response.tags){
          vm.allTags.push(response.tags[k].name);
        }
      }).error(function(response){
        console.log(response);
      })
    };

    vm.removeTag = function(tag){
      console.log(tag);
      var index = vm.tags.indexOf(tag);
      if(index > -1){
        vm.tags.splice(index);
      }
    }

    vm.addTag = function(){
      vm.tags.push(vm.tag);
      vm.tag = '';
    };
  vm.options = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };


  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  vm.toggleMin = function() {
    vm.options.minDate = vm.options.minDate ? null : new Date();
  };

  vm.toggleMin();

  vm.setDate = function(year, month, day) {
    vm.dt = new Date(year, month, day);
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date(tomorrow);
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  vm.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < vm.events.length; i++) {
        var currentDay = new Date(vm.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return vm.events[i].status;
        }
      }
    }

    return '';
  }


  function init(){
    vm.convo = {};
    vm.theEvent = {};
    vm.tags = [];
    vm.allTags = [];
    vm.loadTags();
    var type = $window.localStorage.getItem('action_type');

    if(type == "comment"){

    }
    if(type == "event"){
      // Api call to events
      var url = baseUrl + "/api/users/" + $window.localStorage.getItem('user_id') + "/events/" + $window.localStorage.getItem('event_to_edit');
      $http.get(url).then(function(response){ 
        vm.theEvent = response.data.event;
         console.log(response.data.event);
        vm.mytime = new Date(response.data.event.start_date);
        console.log(response.data.event.start_date);
        vm.dt = new Date(response.data.event.start_date);
        vm.tags = response.data.tags;
        $window.localStorage.removeItem('action_type');
        $window.localStorage.removeItem('event_to_edit'); 
      });

    }
    if(type == "conversation"){
      // Api call to conversations 
      var url = baseUrl + "/api/users/" + $window.localStorage.getItem('user_id') + "/conversations/" + $window.localStorage.getItem('convo_to_edit');
      $http.get(url).then(function(response){ 
        vm.convo = response.data.conversation;
        vm.tags = response.data.tags;
        console.log(response);
        $window.localStorage.removeItem('action_type');
        $window.localStorage.removeItem('convo_to_edit'); 
      });

    }
  }


  vm.deleteEvent = function(){
      var event = {
        "id": $window.localStorage.getItem("event_to_delete")
      }

      var url = baseUrl+ "api/users/" + $window.localStorage.getItem("user_id") + '/events/' + $window.localStorage.getItem("event_to_delete");

      var req = {
       method: 'DELETE',
       url: url,
       headers: {
         'Authorization': userFactory.getAuthToken()
       },
       data: { event: event }
      }

     $http(req).success(function(response){
        $uibModalInstance.close();
        $window.localStorage.removeItem('event_to_delete'); 
        $window.location.href = "/";
      }).error(function(response){
        console.log(response);
      })    
  }

  vm.deleteConvo = function(){
      var conversation = {
        "id": $window.localStorage.getItem("convo_to_delete")
      }

      var url = baseUrl+ "api/users/" + $window.localStorage.getItem("user_id") + '/conversations/' + $window.localStorage.getItem("convo_to_delete");

      var req = {
       method: 'DELETE',
       url: url,
       headers: {
         'Authorization': userFactory.getAuthToken()
       },
       data: { conversation: conversation }
      }

     $http(req).success(function(response){
        $uibModalInstance.close();
         $window.localStorage.removeItem('convo_to_delete'); 
        $window.location.href = "/";
      }).error(function(response){
        console.log(response);
      })    
  }


    vm.editConvo = function(){

      var conversation = {
        "title": vm.convo.title,
        "description": vm.convo.description,
        "tag_list": vm.tags 
      }
      var url = baseUrl+ "api/users/" + $window.localStorage.getItem('user_id') + "/conversations/" + vm.convo.id;

      var req = {
       method: 'PATCH',
       url: url,
       headers: {
         'Authorization': userFactory.getAuthToken()
       },
       data: { conversation: conversation }
      }

      $http(req).success(function(response){
        $uibModalInstance.close();
        $window.location.reload()
      }).error(function(response){
        console.log(response);
      })    
    }

    vm.deleteComment = function(){
      var id = $window.localStorage.getItem('comment_to_delete');
      var deletor = $window.localStorage.getItem('user_id');

    var comment = {  "id": id, "deletor": deletor};
      var url = baseUrl+ "api/comments/";
      var req = {
       method: 'DELETE',
       url: url,
       headers: {
         'Authorization': userFactory.getAuthToken(),
         'Content-Type': 'application/json'
       },
       data: {  comment: comment}
      }

      $http(req).success(function(response){
        $uibModalInstance.close();
        $window.localStorage.removeItem('comment_to_delete');
        $window.location.reload()
      }).error(function(response){
        console.log(response);
      })    
    }

    vm.editEvent = function(){
    var date = vm.dt.toISOString().split('T')[0];
    var time = vm.mytime.toISOString().split('T')[1];
    var datetime = date + 'T'+ time;
      var event = {
        "title": vm.theEvent.title,
        "description": vm.theEvent.description,
        "tag_list": vm.tags,
        "start_date": datetime
      }
      var url = baseUrl+ "api/users/" + $window.localStorage.getItem('user_id') + "/events/" + vm.theEvent.id;

      var req = {
       method: 'PATCH',
       url: url,
       headers: {
         'Authorization': userFactory.getAuthToken()
       },
       data: { event: event }
      }

      $http(req).success(function(response){
        $uibModalInstance.close();
        $window.location.reload()
      }).error(function(response){
        console.log(response);
      })    
    }

    init();
}]);
