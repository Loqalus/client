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

  function getInHouseOrOutSrc(){
    return `<div class="modal-lg">
       <div class="modal-header">
         Will this be in house content or sourced content?<button type="button" ng-click="vm.close()" class="close">&times;</button>
       </div>
         <div class="modal-body-lg">
        <div class="col-lg-12 modal-white-bg">
          <div class="col-lg-1">
          </div>
          <div ng-class="vm.sourcedClass" ng-click="vm.setType('sourced')">
            <h3>Sourced</h3>
            <p class="startanaction-desc"> Sourced content is content created on another site that you wish to promote on Loqalus.</p> </label>
          </div>

          <div ng-class="vm.inHouseClass" ng-click="vm.setType('inHouse')">
            <h3>In House</h3>
            <p class="startanaction-desc">In house content is content created originally on Loqalus. (Campaigns not yet supported!)</p> </label>
          </div>
          
        </div>
      </div>
        <div  class="modal-footer">
          <button class="btn btn-success" type="button" ng-disabled="vm.disable()" ng-click="vm.next()"><span class="glyphicon glyphicon-off">Next</button>
        </div>
</div>`
  };

  function getInHouseOrSourced(){
    return `<div class="modal-lg">
       <div class="modal-header">
         Will this be in house or sourced from another site?<button type="button" ng-click="vm.close()" class="close">&times;</button>
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
         <form role="form" ng-show="vm.inHouse">
           <div class="form-group">
             <label for="title"><span class="glyphicon "></span> Title: </label>
             <input type="text" class="form-control" ng-required="vm.inHouse" ng-model="vm.campaign.title" placeholder="Title for your Campaign">
           </div>
           <div class="form-group">
             <label for="description"><span class="glyphicon"></span> Description: </label>
             <input type="text" class="form-control" ng-required="vm.inHouse"  ng-model="vm.campaign.description" placeholder="Description of your Campaign">
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
             <input type="text" class="form-control" ng-required="{{!vm.inHouse}}" ng-model="vm.campaign.title" placeholder="Title for the Campaign">
           </div>
           <div class="form-group">
             <label for="description"><span class="glyphicon"></span> Description: </label>
             <input type="text" class="form-control" ng-required="{{!vm.inHouse}}" ng-model="vm.campaign.description" placeholder="Description of the Campaign">
           </div>
           <div class="form-group">
             <label for="description"><span class="glyphicon"></span> Link: </label>
             <input type="text" class="form-control" ng-required="{{!vm.inHouse}}"  ng-model="vm.campaign.link" placeholder="Link to Campaign">
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
      <h5 ng-show="vm.data.error" ><span  class="text-danger">Wrong Username or Password</span></h5>
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

    function getEditProfileModal(){
    return `<div class="modal-content">
              <div class="modal-header">
               <span>Edit Your Profile</span> <button type="button" ng-click="vm.close()" class="close">&times;</button>
             </div>
                <div class="modal-body" style="padding:40px 50px;">
                      <form role="form"> 
                        <div class="form-group">
                            <label for="name"><span class="glyphicon"></span> Name: </label>
                            <input type="text" ng-model="vm.user.name" class="form-control" placeholder="Name">
                        </div>
                        <div class="form-group">
                            <label for="email"><span class="glyphicon"></span> Email: </label>
                            <input type="email" ng-model="vm.user.email" class="form-control" placeholder="Email">
                        </div>
                        <div class="form-group">
                            <label for="bio"><span class="glyphicon"></span> Bio: </label>
                            <textarea  ng-model="vm.user.bio" name="paragraph_text" class="form-control" placeholder="Describe Yourself" cols="50" rows="10"></textarea>
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
                      <div data-ng-repeat="tags in vm.interests">
                      <a href='javascript:' ng-click="vm.removeInterest(tags)" class="btn btn-info" role="button">{{tags}}</a>
                      </div>
                    </form>   
                </div>

               <div class="modal-footer">
                  <button type="submit" ng-click="vm.edit()" class="btn btn-success btn-block" ><span class="glyphicon glyphicon-off"></span> Edit</button>
               </div>
          </div>
          `
  }

    function getDeleteProfileModal(){
    return `<div class="modal-content">
              <div class="modal-header">
               <span>Are you sure you want to delete your profile?</span> <button type="button" ng-click="vm.close()" class="close">&times;</button>
             </div>
                <div class="modal-body" style="padding:40px 50px;">
                   <h4 class="modal-title"></h4>
                      <button ng-click="vm.deleteProf()" type="button" class="btn btn-success btn-block">Delete Profile Forever!</button>
                </div>

               <div class="modal-footer">
                  <button type="submit" ng-click="vm.close()" class="btn btn-success btn-block" ></span> Cancel</button>
               </div>
          </div>
          `
  }

      function getDeleteEventModal(){
    return `<div class="modal-content">
              <div class="modal-header">
               <span>Are you sure you want to delete this event?</span> <button type="button" ng-click="vm.close()" class="close">&times;</button>
             </div>
                <div class="modal-body" style="padding:40px 50px;">
                   <h4 class="modal-title"></h4>
                      <button ng-click="vm.deleteEvent()" type="button" class="btn btn-success btn-block">Delete Event</button>
                </div>

               <div class="modal-footer">
                  <button type="submit" ng-click="vm.close()" class="btn btn-success btn-block" ></span> Cancel</button>
               </div>
          </div>
          `
  }

      function getDeleteConvoModal(){
    return `<div class="modal-content">
              <div class="modal-header">
               <span>Are you sure you want to delete this conversation?</span> <button type="button" ng-click="vm.close()" class="close">&times;</button>
             </div>
                <div class="modal-body" style="padding:40px 50px;">
                   <h4 class="modal-title"></h4>
                      <button ng-click="vm.deleteConvo()" type="button" class="btn btn-success btn-block">Delete Conversation</button>
                </div>

               <div class="modal-footer">
                  <button type="submit" ng-click="vm.close()" class="btn btn-success btn-block" ></span> Cancel</button>
               </div>
          </div>
          `
  }

        function getMustSignIn(){
    return `<div class="modal-content">
              <div class="modal-header">
               <span>You must create a profile in order to post content!</span> <button type="button" ng-click="vm.close()" class="close">&times;</button>
             </div>
                <div class="modal-body" style="padding:40px 50px;">

                </div>

               <div class="modal-footer">
                  <button type="submit" ng-click="vm.close()" class="btn btn-success btn-block" ></span> Ok</button>
               </div>
          </div>
          `
  }

      function getEditConvoModal(){
    return `
<div class="modal-content" >
       <div class="modal-header">
         <span> Edit Your Conversation</span>
         <button type="button" class="close" ng-click="vm.close()">&times;</button>
       </div>
       <div class="modal-body" style="padding:40px 50px;">
         <form role="form">
           <div class="form-group">
             <label for="title"><span class="glyphicon "></span> Title: </label>
             <input ng-model="vm.convo.title" type="text" class="form-control">
           </div>
           
            <span> Change The Marker Location On The Map

          </span>

          <div style = "width: 100%; height: 200px;">
            
          </div>

            
           <div class="form-group">
             <label for="description"><span class="glyphicon"></span> Description: </label>
             <input ng-model="vm.convo.description" type="text" class="form-control">
           </div>
          <div>
            <label>Your Interests</label>
            <input type="text" data-ng-model="vm.tag" list="allTags">
          </div>
          <div>
          <input type="Button" value="Add" data-ng-click="vm.addTag()">
          </div>
        <datalist id="allTags">
          <option  data-ng-repeat="tag in vm.allTags" value="{{tag}}"> 
        </datalist>
        <div data-ng-repeat="tags in vm.tags">
        <a href='javascript:' ng-click="vm.removeTag(tags)" class="btn btn-info" role="button">{{tags}}</a>
        </div>
         </form>
       </div>
       <div class="modal-footer">
          <button ng-click="vm.editConvo()" type="button" class="btn btn-success btn-block"><span class="glyphicon glyphicon-off"></span>Save</button>
       </div>
     </div>
          `
  }


      function getEditEventModal(){
    return `
<div class="modal-content" >
       <div class="modal-header">
         <span> Edit Your Conversation</span>
         <button type="button" class="close" ng-click="vm.close()">&times;</button>
       </div>
       <div class="modal-body" style="padding:40px 50px;">
         <form role="form">
           <div class="form-group">
             <label for="title"><span class="glyphicon "></span> Title: </label>
             <input ng-model="vm.theEvent.title" type="text" class="form-control">
           </div>
           
            <span> Change The Marker Location On The Map

          </span>

          <div style = "width: 100%; height: 200px;">
            
          </div>

          <h4>Date of the Event</h4>
          <div style="display:inline-block; min-height:290px;">
            <div uib-datepicker ng-model="vm.dt" class="well well-sm" datepicker-options="options"></div>
          </div>
          <h4>Time of the Event</h4>
          <div uib-timepicker ng-model="vm.mytime" ng-change="vm.changed()" hour-step="1" minute-step="5" show-meridian="true"></div>
          <hr>
          <div>
           <div class="form-group">
             <label for="description"><span class="glyphicon"></span> Description: </label>
             <input ng-model="vm.theEvent.description" type="text" class="form-control">
           </div>
          <div>
            <label>Your Interests</label>
            <input type="text" data-ng-model="vm.tag" list="allTags">
          </div>
          <div>
          <input type="Button" value="Add" data-ng-click="vm.addTag()">
          </div>
        <datalist id="allTags">
          <option  data-ng-repeat="tag in vm.allTags" value="{{tag}}"> 
        </datalist>
        <div data-ng-repeat="tags in vm.tags">
        <a href='javascript:' ng-click="vm.removeTag(tags)" class="btn btn-info" role="button">{{tags}}</a>
        </div>
         </form>
       </div>
       <div class="modal-footer">
          <button ng-click="vm.editEvent()" type="button" class="btn btn-success btn-block"><span class="glyphicon glyphicon-off"></span>Save</button>
       </div>
     </div>
    `
  }

  function getDeleteCommentModal(){
    return `<div class="modal-content">
              <div class="modal-header">
               <span>Are you sure you want to delete this comment?</span> <button type="button" ng-click="vm.close()" class="close">&times;</button>
             </div>
                <div class="modal-body" style="padding:40px 50px;">
                   <h4 class="modal-title"></h4>
                      <button ng-click="vm.deleteComment()" type="button" class="btn btn-success btn-block">Delete Comment</button>
                </div>

               <div class="modal-footer">
                  <button type="submit" ng-click="vm.close()" class="btn btn-success btn-block" ></span> Cancel</button>
               </div>
          </div>
          `
    }

  function getPromotedEventSuccess(){
    return `<div class="modal-content">
              <div class="modal-header">
               <span>Promoted Event created!</span> <button type="button" ng-click="vm.close()" class="close">&times;</button>
             </div>
                <div class="modal-body" style="padding:40px 50px;">

                </div>

               <div class="modal-footer">
                  <button type="submit" ng-click="vm.close()" class="btn btn-success btn-block" ></span> Ok</button>
               </div>
          </div>
          `
  }

  function getPromotedConvoSuccess(){
    return `<div class="modal-content">
              <div class="modal-header">
               <span>Promoted Conversation created!</span> <button type="button" ng-click="vm.close()" class="close">&times;</button>
             </div>
                <div class="modal-body" style="padding:40px 50px;">

                </div>

               <div class="modal-footer">
                  <button type="submit" ng-click="vm.close()" class="btn btn-success btn-block" ></span> Ok</button>
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
    getRegisterModal: getRegisterModal,
    getInHouseOrOutSrc: getInHouseOrOutSrc,
    getEditProfileModal: getEditProfileModal,
    getDeleteProfileModal: getDeleteProfileModal,
    getDeleteEventModal: getDeleteEventModal,
    getDeleteConvoModal: getDeleteConvoModal,
    getMustSignIn: getMustSignIn,
    getEditConvoModal: getEditConvoModal,
    getEditEventModal: getEditEventModal,
    getDeleteCommentModal: getDeleteCommentModal,
    getPromotedConvoSuccess: getPromotedConvoSuccess,
    getPromotedEventSuccess: getPromotedEventSuccess
  };

});