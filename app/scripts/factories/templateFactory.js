angular.module('loqalusClientApp').factory('templateFactory', function(){
  function getCreatePinsOne(){
    return `<div class="modal-lg">
       <div class="modal-header">
         What would you a like to start in your community?<button type="button" ng-click="vm.close()" class="close">&times;</button>
       </div>
         <div class="modal-body-lg">
        <div class="col-lg-12 modal-white-bg">
          <div class="col-lg-1">
          </div>
          <div ng-class="vm.convoClass" ng-click="vm.setType('Conversation')">
            <h3>Make a Post</h3>
            <p class="startanaction-desc"> Raise awareness and start a conversation</p> </label>
          </div>

          <div ng-class="vm.eventClass" ng-click="vm.setType('Event')">
            <h3>Create an Event</h3>
            <p class="startanaction-desc">Get people together for a local gathering</p> </label>
          </div>

          <div ng-class="vm.campaignClass" ng-click="vm.setType('Campaign')">
            <h3>Begin a Campaign</h3>
            <p class="startanaction-desc">Raise funds for a local project, cause, or enterprise.</p> </label>
          </div>
          <div class="col-lg-1">
          </div>
          
        </div>
      </div>
        <div  class="modal-footer">
          <button class="btn btn-success" type="button" ng-disabled="vm.disable()" ng-click="vm.next()"><span class="glyphicon glyphicon-off">Next</button>
        </div>
</div>`
  };

  function getConversationModal(){
    return `<div class="modal-content">
    <div class="modal-header">
      <span>  Create Conversation </span> <button type="button" ng-click="vm.close()" class="close">&times;</button>
    </div>
    <div class="modal-body" style="padding:40px 50px;">
      <div class="btn-group" data-toggle="buttons">
      <form>
        <input class="btn btn-success" type="radio" ng-model="vm.inHouse" ng-value="true"> In House
        <input class="btn btn-success" type="radio" ng-value="false" ng-model="vm.inHouse"> Out Sourced
      </form>
      </div>

      <form role="form" ng-show="vm.inHouse">
       <div class="form-group">
         <label for="title"><span class="glyphicon "></span> Title: </label>
         <input type="text" class="form-control" ng-required="vm.inHouse" ng-model="vm.convo.title" placeholder="Title for your conversation">
       </div>
       <div class="form-group">
         <label for="description"><span class="glyphicon"></span> Description: </label>
         <input type="text" class="form-control" ng-required="vm.inHouse" ng-model="vm.convo.description" placeholder="Description of your post">
       </div>
      </form>


      <form role="form" ng-hide="vm.inHouse">
       <div class="form-group">
         <label for="title"><span class="glyphicon "></span> Title: </label>
         <input type="text" class="form-control" ng-required="{{!vm.inHouse}}" ng-model="vm.convo.title" placeholder="Title for the post">
       </div>
       <div class="form-group">
         <label for="description"><span class="glyphicon"></span> Description: </label>
         <input type="text" class="form-control" ng-required="{{!vm.inHouse}}" ng-model="vm.convo.description" placeholder="Description of the post">
       </div>
        <div class="form-group">
         <label for="description"><span class="glyphicon"></span> Link: </label>
         <input type="text" class="form-control" ng-required="{{!vm.inHouse}}" ng-model="vm.convo.link" placeholder="Link to post">
       </div>
     </form>

     </div>
     <div class="modal-footer">
        <button type="submit" ng-click="vm.create()" class="btn btn-success btn-block" value="Go to next page"><span class="glyphicon glyphicon-off"></span>Save</button>
     </div>
 </div>`
  };


  function getCampaignModal(){
    return `<div class="modal-content">
        
       <div class="modal-header">
         <span> Create Campaign </span> <button type="button" ng-click="vm.close()" class="close">&times;</button>
       </div>
       <div class="modal-body" style="padding:40px 50px;">
       <div class="btn-group" data-toggle="buttons">
      <form>
      <input class="btn btn-success" type="radio" ng-model="vm.inHouse" ng-value="true"> In House
      <input class="btn btn-success" type="radio" ng-value="false" ng-model="vm.inHouse"> Out Sourced
    </form>
  </div>
         <form role="form" ng-show="vm.inHouse">
           <div class="form-group">
             <label for="title"><span class="glyphicon "></span> Title: </label>
             <input type="text" class="form-control" ng-required="vm.inHouse"  placeholder="Title for your Campaign">
           </div>
           <div class="form-group">
             <label for="description"><span class="glyphicon"></span> Description: </label>
             <input type="text" class="form-control" ng-required="vm.inHouse"  placeholder="Description of your Campaign">
           </div>
         </form>
          <form role="form" ng-hide="vm.inHouse">
           <div class="form-group">
             <label for="title"><span class="glyphicon "></span> Title: </label>
             <input type="text" class="form-control" ng-required="{{!vm.inHouse}}" placeholder="Title for the Campaign">
           </div>
           <div class="form-group">
             <label for="description"><span class="glyphicon"></span> Description: </label>
             <input type="text" class="form-control" ng-required="{{!vm.inHouse}}" placeholder="Description of the Campaign">
           </div>
           <div class="form-group">
             <label for="description"><span class="glyphicon"></span> Link: </label>
             <input type="text" class="form-control" ng-required="{{!vm.inHouse}}"  placeholder="Link to Campaign">
           </div>
         </form>
       </div>
       <div class="modal-footer">
          <button type="submit" ng-click="vm.create()" class="btn btn-success btn-block" value="Go to next page"><span class="glyphicon glyphicon-off"></span>Save</button>
       </div>
     </div>`
  };


  function getEventModal(){
    return `<div class="modal-content">
        
       <div class="modal-header">
         <span>Create Event</span> <button type="button" ng-click="vm.close()" class="close">&times;</button>
       </div>
       <div class="modal-body" style="padding:40px 50px;">
       <div class="btn-group" data-toggle="buttons">
      <form>
      <input class="btn btn-success" type="radio" ng-model="vm.inHouse" ng-value="true"> In House
      <input class="btn btn-success" type="radio" ng-value="false" ng-model="vm.inHouse"> Out Sourced
    </form>
  </div>
         <form role="form" ng-show="vm.inHouse">
           <div class="form-group">
             <label for="title"><span class="glyphicon "></span> Title: </label>
             <input type="text" class="form-control" ng-model="vm.newEvent.title" ng-required="vm.inHouse" placeholder="Title for your Event">
           </div>
           <div class="form-group">
             <label for="description"><span class="glyphicon"></span> Description: </label>
             <input type="text" class="form-control" ng-model="vm.newEvent.description" ng-required="vm.inHouse" placeholder="Description of your Event">
           </div>
          <h4>Date of the Event</h4>
          <div style="display:inline-block; min-height:290px;">
            <div uib-datepicker ng-model="vm.dt" class="well well-sm" datepicker-options="options"></div>
          </div>
          <h4>Time of the Event</h4>
          <div uib-timepicker ng-model="vm.mytime" ng-change="vm.changed()" hour-step="1" minute-step="5" show-meridian="true"></div>
          <hr>
         </form>

          <form role="form" ng-hide="vm.inHouse">
           <div class="form-group">
             <label for="title"><span class="glyphicon "></span> Title: </label>
             <input type="text" class="form-control" ng-model="vm.newEvent.title" ng-required="{{!vm.inHouse}}" placeholder="Title for the Event">
           </div>
           <div class="form-group">
             <label for="description"><span class="glyphicon"></span> Description: </label>
             <input type="text" class="form-control" ng-model="vm.newEvent.description" ng-required="{{!vm.inHouse}}" placeholder="Description of the Event">
           </div>
            <div class="form-group">
             <label for="description"><span class="glyphicon"></span> Link: </label>
             <input type="text" class="form-control" ng-model="vm.newEvent.link" ng-required="{{!vm.inHouse}}" placeholder="Link to Event">
           </div>
           <hr>
         </form>
       </div>
       <div class="modal-footer">
          <button type="submit" ng-click="vm.create()" class="btn btn-success btn-block" value="Go to next page"><span class="glyphicon glyphicon-off"></span>Save</button>
       </div>
     </div>`
  };

  return {
  	getCreatePinsOne: getCreatePinsOne,
    getConversationModal: getConversationModal,
    getCampaignModal: getCampaignModal,
    getEventModal: getEventModal
  };

});