'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:eventCtrl
 * @description
 * # eventCtrl
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp')
  .controller('eventCtrl', ['$scope', '$routeParams', '$http', '$window', 'urlFactory', '$uibModal', 'templateFactory', function ($scope, $routeParams, $http, $window, urlFactory, $uibModal, templateFactory) {
    var eventCtrl = this;
    var baseUrl = urlFactory.getBaseUrl();
    eventCtrl.theEvent = {};
    eventCtrl.newComment = "";
    eventCtrl.tags = [];
    eventCtrl.isOwner = false;
    eventCtrl.image;
    eventCtrl.Owner = {};
    eventCtrl.comments = []
    eventCtrl.dates = []

    function setImage(){
        var num = 3 * Math.random();
        var background = 0;
        // Not using zero for now.
        if(num <+ 1){
            background = 2;
        }
        else if(num > 2){
            background = 2;
        }
        else{
            background = 1;
        }
        eventCtrl.image = "images/backdrop" + background + ".jpg";
    }
    setImage();

    eventCtrl.deleteComment = function(index){
        $window.localStorage.setItem('action_type', 'comment');
        $window.localStorage.setItem('comment_to_delete', eventCtrl.comments[index].id);
        var modal = $uibModal.open({
          template: templateFactory.getDeleteCommentModal(),
          size: 'md',
          controller: 'editActionCtrl',
          bindToController: true,
          controllerAs: 'vm'
        });
    }

    eventCtrl.disablePostComment = function(){
      if($window.localStorage.getItem('user_id')){
        return false;
      }
      else{
        return true;
      }
    };

    eventCtrl.createdThisComment = function(index){
        return (parseInt($window.localStorage.getItem('user_id')) === parseInt(eventCtrl.comments[index].user_id));
    }


    eventCtrl.editAction = function(){
    $window.localStorage.setItem('action_type', 'event');
    $window.localStorage.setItem('event_to_edit', eventCtrl.theEvent.id)
    var modal = $uibModal.open({
      template: templateFactory.getEditEventModal(),
      size: 'md',
      controller: 'editActionCtrl',
      bindToController: true,
      controllerAs: 'vm'
    });
    }

    eventCtrl.deleteAction = function(){
    $window.localStorage.setItem('event_to_delete', eventCtrl.theEvent.id); 
    var modal = $uibModal.open({
      template: templateFactory.getDeleteEventModal(),
      size: 'md',
      controller: 'editActionCtrl',
      bindToController: true,
      controllerAs: 'vm'
    });
    }

    eventCtrl.addComment = function(){
      var id = $window.localStorage.getItem('user_id')
      var url = baseUrl + "api/events/comments"
      var payload = {"id": $routeParams.id,
                      "comment": eventCtrl.newComment,
                      "user_id": id
                    };
      $http.post(url, payload).success(function success(response){
        eventCtrl.newComment = "";
        getComments();
      }).error(function error(response) {
        console.log("Something went wrong");
        eventCtrl.newComment = "";
      });
    };

    eventCtrl.cancelComment = function(){
      eventCtrl.newComment = "";
    };

    eventCtrl.Init = function(){
      var url = baseUrl + "api/event/" + $routeParams.id;
      $http.get(url).success(function success(response){
        if(response.event.user_id === $window.localStorage.getItem("user_id") && $window.localStorage.getItem("user_id")){
            eventCtrl.isOwner = true;
        }
        eventCtrl.theEvent = response.event;
        eventCtrl.tags = response.tags;
        eventCtrl.Owner = response.creator;

      }).error(function error(response) {
        console.log("Something went wrong");
      });
      getComments();
    };

    function getComments(){
      var url = baseUrl + "api/events/" + $routeParams.id + "/comments";
      $http.get(url).success(function success(response){
        eventCtrl.comments = response.comments;
        eventCtrl.dates = []
        for(var i = 0; i < eventCtrl.comments.length; i++){
          eventCtrl.dates.push(new Date(eventCtrl.comments[i].created_at));
        }
      console.log(response.comments);
      console.log(eventCtrl.dates);

      }).error(function error(response) {
        console.log("Something went wrong");
      });
    }

    eventCtrl.Init();
  }]);
