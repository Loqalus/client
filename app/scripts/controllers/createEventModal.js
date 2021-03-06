'use strict';

/**
 * @ngdoc function
 * @name loqalusClientApp.controller:CrtEventMdlCtrl
 * @description
 * # CrtEventMdlCtrl
 * Controller of the loqalusClientApp
 */
angular.module('loqalusClientApp').controller('CrtEventMdlCtrl', ['$scope', 'newActionPage', '$uibModalInstance', '$uibModal', '$window', '$http', 'urlFactory', 'templateFactory', function ($scope, newActionPage, $uibModalInstance, $uibModal, $window, $http, urlFactory, templateFactory) {

  var vm = this;
  vm.inHouse = newActionPage.getInHouse();;
  var baseUrl = urlFactory.getBaseUrl();
  vm.$onInit;
  vm.type;
  vm.close;
  vm.toggle;
  vm.mytime = new Date();
  vm.allTags = [];

  vm.close = function(){
    $uibModalInstance.close();
  }

    vm.addTag = function(){
      vm.eventTags.push(vm.tag);
      vm.tag = '';
    };

  vm.loadTags = function(){
  vm.eventTags = [];
  var url = baseUrl + "api/tag";
  $http.get(url).success(function(response){
    for(var k in response.tags){
      vm.allTags.push(response.tags[k].name);
    }
  }).error(function(response){
    console.log(response);
  })
};

  vm.newEvent = {
    title: null,
    description: null,
    start_date: null,
    user_id: null,
    latitude: null,
    longitude: null,
    in_house: null,
    link: null,
    action_type: 0
  };


  vm.today = function() {
    vm.dt = new Date();
  };

  vm.today();

  vm.clear = function() {
    vm.dt = null;
  };

  vm.create = function(){
    vm.newEvent.in_house = vm.inHouse;
    var loc = newActionPage.getLatLng();
    vm.newEvent.latitude = loc.lat;
    vm.newEvent.user_id = $window.localStorage.getItem("user_id");
    vm.newEvent.longitude = loc.lng;
    vm.newEvent.tag_list = vm.eventTags;
    var date = vm.dt.toISOString().split('T')[0];
    var time = vm.mytime.toISOString().split('T')[1];
    var datetime = date + 'T'+ time;
    vm.newEvent.start_date = datetime;
    newActionPage.createEvent(vm.newEvent)
    .success(function (data, status, headers, config) {
      vm.close();
      if(vm.newEvent.in_house){
        $window.location.href = "/#/event/" + data.message.id;
      }else{

        $window.setTimeout(function(){
            var modalInstance = $uibModal.open({
            template: templateFactory.getPromotedEventSuccess(),
            size: 'md',
            controller: 'modalOneCtrl',
            bindToController: true,
            controllerAs: 'vm'
         });
          }, 1000);

      }
      
      console.log("success");
    })
    .error(function (data, status, header, config) {
      console.log("error");
    });
  }


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

  vm.loadTags();

}]);