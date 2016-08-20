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
           <div>
            <label>Tag Event</label>
            <input type="text" data-ng-model="vm.tag" list="allTags">
          </div>
          <div>
            <input type="Button" value="Add" data-ng-click="vm.addTag()">
            </div>
          <datalist id="allTags">
            <option  data-ng-repeat="tag in vm.allTags" value="{{tag}}"> 
          </datalist>
          <div data-ng-repeat="tags in vm.convoTags">
            <span> {{tags}} </span>
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
           <div>
            <label>Tag Event</label>
            <input type="text" data-ng-model="vm.tag" list="allTags">
          </div>
          <div>
            <input type="Button" value="Add" data-ng-click="vm.addTag()">
            </div>
          <datalist id="allTags">
            <option  data-ng-repeat="tag in vm.allTags" value="{{tag}}"> 
          </datalist>
          <div data-ng-repeat="tags in vm.convoTags">
            <span> {{tags}} </span>
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
           <div>
            <label>Tag Event</label>
            <input type="text" data-ng-model="vm.tag" list="allTags">
          </div>
          <div>
            <input type="Button" value="Add" data-ng-click="vm.addTag()">
            </div>
          <datalist id="allTags">
            <option  data-ng-repeat="tag in vm.allTags" value="{{tag}}"> 
          </datalist>
          <div data-ng-repeat="tags in vm.campTags">
            <span> {{tags}} </span>
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
           <div>
            <label>Tag Event</label>
            <input type="text" data-ng-model="vm.tag" list="allTags">
          </div>
          <div>
            <input type="Button" value="Add" data-ng-click="vm.addTag()">
            </div>
          <datalist id="allTags">
            <option  data-ng-repeat="tag in vm.allTags" value="{{tag}}"> 
          </datalist>
          <div data-ng-repeat="tags in vm.campTags">
            <span> {{tags}} </span>
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
          <div>
            <label>Tag Event</label>
            <input type="text" data-ng-model="vm.tag" list="allTags">
          </div>
          <div>
            <input type="Button" value="Add" data-ng-click="vm.addTag()">
            </div>
          <datalist id="allTags">
            <option  data-ng-repeat="tag in vm.allTags" value="{{tag}}"> 
          </datalist>
          <div data-ng-repeat="tags in vm.eventTags">
            <span> {{tags}} <span>
          </div>
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
          <div>
            <label>Tag Event</label>
            <input type="text" data-ng-model="vm.tag" list="allTags">
          </div>
          <div>
            <input type="Button" value="Add" data-ng-click="vm.addTag()">
            </div>
          <datalist id="allTags">
            <option  data-ng-repeat="tag in vm.allTags" value="{{tag}}"> 
          </datalist>
          <div data-ng-repeat="tags in vm.eventTags">
            <span> {{tags}} </span>
          </div>
         </form>
       </div>
       <div class="modal-footer">
          <button type="submit" ng-click="vm.create()" class="btn btn-success btn-block" value="Go to next page"><span class="glyphicon glyphicon-off"></span>Save</button>
       </div>
     </div>`
  };

  function getSignInModal(){
    return `<div class="modal-content">
        <div class="modal-header">
         <span>Login</span> <button type="button" ng-click="vm.close()" class="close">&times;</button>
       </div>
       <div class="modal-body" style="padding:40px 50px;">
      <form name="form" role="form">
          <div class="form-group" ng-class="{ 'has-error': form.email.$dirty && form.email.$error.required }">
              <label for="email"><span class="glyphicon"></span> Email: </label>
              <input type="email" name="email" id="email" class="form-control" ng-model="vm.email" required />
              <span ng-show="form.email.$dirty && form.email.$error.required" class="help-block">Email is required</span>
          </div>
          <div class="form-group" ng-class="{ 'has-error': form.password.$dirty && form.password.$error.required }">
              <label for="password"><span class="glyphicon"></span> Password: </label>
              <input type="password" name="password" id="password" class="form-control" ng-model="vm.password" required />
              <span ng-show="form.password.$dirty && form.password.$error.required" class="help-block">Password is required</span>
          </div>
          <div class="form-actions">
              <button type="submit" ng-click="vm.login()" class="btn btn-success btn-block"><span class="glyphicon glyphicon-off"></span>Login</button>
          </div>
      </form>
      </div>
    </div>`
  }

  function getRegisterModal(){
    return `<div class="modal-content">
              <div class="modal-header">
               <span>Create An Account</span> <button type="button" ng-click="vm.close()" class="close">&times;</button>
             </div>
                <div class="modal-body" style="padding:40px 50px;">
                      <form role="form"> 
                        <div class="form-group">
                            <label for="name"><span class="glyphicon"></span> Name: </label>
                            <input type="text" ng-model="vm.name" class="form-control" placeholder="Name">
                        </div>
                        <div class="form-group">
                            <label for="email"><span class="glyphicon"></span> Email: </label>
                            <input type="email" ng-model="vm.newEmail" class="form-control" placeholder="Email">
                        </div>
                        <div class="form-group">
                            <label for="bio"><span class="glyphicon"></span> Bio: </label>
                            <textarea  ng-model="vm.bio" name="paragraph_text" class="form-control" placeholder="Describe Yourself" cols="50" rows="10"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="password"><span class="glyphicon"></span> Password: </label>
                            <input type="password" ng-model="vm.newPassword" class="form-control" placeholder="Password">
                        </div>
                      <div>
                        <label>Your Interests</label>
                        <input type="text" data-ng-model="vm.interest" list="allInterests">
                      </div>
                      <div>
                        <input type="Button" value="Add" data-ng-click="vm.addInterest()">
                        </div>
                      <datalist id="allInterests">
                        <option  data-ng-repeat="tag in vm.allInterests" value="{{tag}}"> 
                      </datalist>
                      <div data-ng-repeat="tags in vm.theirInterests">
                        <span> {{tags}} </span>
                      </div>
                    </form>   
                </div>

               <div class="modal-footer">
                  <button type="submit" ng-click="vm.signUp()" class="btn btn-success btn-block" ><span class="glyphicon glyphicon-off"></span> Create</button>
               </div>
          </div>
          `
  }


  return {
  	getCreatePinsOne: getCreatePinsOne,
    getConversationModal: getConversationModal,
    getCampaignModal: getCampaignModal,
    getEventModal: getEventModal,
    getSignInModal: getSignInModal,
    getRegisterModal: getRegisterModal
  };

});