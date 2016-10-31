'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:conversationCtrl
 * @description
 * # conversationCtrl
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp')
  .controller('conversationCtrl', ['$scope', '$routeParams', '$http', '$window', 'urlFactory', '$uibModal', 'templateFactory', function ($scope, $routeParams, $http, $window, urlFactory, $uibModal, templateFactory) {
    var vm = this;
    var baseUrl = urlFactory.getBaseUrl();
    vm.convo = {};
    vm.newComment = "";
    vm.tags = [];
    vm.isOwner = false;
    vm.image;
    vm.Owner = {};
    vm.comments = []
    vm.dates = []

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
        vm.image = "images/backdrop" + background + ".jpg";
    }
    setImage();

        vm.deleteComment = function(index){
        $window.localStorage.setItem('action_type', 'comment');
        $window.localStorage.setItem('comment_to_delete', vm.comments[index].id);
        var modal = $uibModal.open({
          template: templateFactory.getDeleteCommentModal(),
          size: 'md',
          controller: 'editActionCtrl',
          bindToController: true,
          controllerAs: 'vm'
        });
    }

    vm.disablePostComment = function(){
      if($window.localStorage.getItem('user_id')){
        return false;
      }
      else{
        return true;
      }
    };

    vm.createdThisComment = function(index){
        return (parseInt($window.localStorage.getItem('user_id')) === parseInt(vm.comments[index].user_id));
    }

     vm.editAction = function(){
      $window.localStorage.setItem('action_type', "conversation");
      $window.localStorage.setItem('convo_to_edit', vm.convo.id);
    var modal = $uibModal.open({
      template: templateFactory.getEditConvoModal(),
      size: 'md',
      controller: 'editActionCtrl',
      bindToController: true,
      controllerAs: 'vm'
    });
    }

   vm.deleteAction = function(){
    $window.localStorage.setItem('convo_to_delete', vm.convo.id);   
    var modal = $uibModal.open({
      template: templateFactory.getDeleteConvoModal(),
      size: 'md',
      controller: 'editActionCtrl',
      bindToController: true,
      controllerAs: 'vm'
    });
    }

    vm.addComment = function(){
      var id = $window.localStorage.getItem('user_id')
      var url = baseUrl + "api/conversations/comments"
      var payload = {"id": $routeParams.id,
                      "comment": vm.newComment,
                      "user_id": id
                    };
      $http.post(url, payload).success(function success(response){
         vm.getComments();
         vm.newComment = "";
      }).error(function error(response) {
        console.log("Something went wrong");
        vm.newComment = "";
      });
    };


    vm.cancelComment = function(){
      vm.newComment = "";
    };


    vm.Init = function(){
        console.log($routeParams);
      var url = baseUrl + "api/conversation/" + $routeParams.id;
      $http.get(url).success(function success(response){
        console.log(response);
        vm.convo =  response.conversation;
        vm.tags = response.tags;
        if(response.conversation.user_id === $window.localStorage.getItem("user_id")){
            vm.isOwner = true;
        }
        vm.Owner = response.creator;

      }).error(function error(response) {
        console.log("Something went wrong");
      });
      vm.getComments();

    }

    vm.getComments = function(){
      var url = baseUrl + "api/conversations/" + $routeParams.id + "/comments";
      $http.get(url).success(function success(response){
        console.log(response.comments);
        vm.comments = response.comments;
        vm.dates = []
        for(var i = 0; i < vm.comments.length; i++){
          vm.dates.push(new Date(vm.comments[i].created_at));
        }
      console.log(response.comments);
      console.log(vm.dates);

      }).error(function error(response) {
        console.log("Something went wrong");
      });
    }

    vm.Init();

  }]);
