Cecilia.module("AdminActivityApp.Edit", function(Edit, Cecilia, Backbone, Marionette, $, _){
  Edit.Controller = {
    editActivity: function(id){
      var loadingView = new Cecilia.Common.Views.Loading();
      Cecilia.regions.main.show(loadingView);
      var fetchingActivity = Cecilia.request("admin:activity:entity", id);
      var fetchingUsers = Cecilia.request("user:entities");
      var fetchingDifficulties = Cecilia.request("difficulty:entities");
      var fetchingActivityTypes = Cecilia.request("activity_type:entities");
      var fetchingActivitySubtypes = Cecilia.request("activity_subtype:entities");
      $.when(fetchingActivity,fetchingUsers, fetchingDifficulties, fetchingActivityTypes, fetchingActivitySubtypes).done(function(activity,users,difficulties,activity_types,activity_subtypes){
        var activityView;
        if(activity != undefined){
          activityView = new Edit.ActivityPage({
              model:activity,
              templateHelpers: function(){
                return {
                  'modal_title': 'Edit Activity',
                  'users': users,
                  'difficulties': difficulties,
                  'activity_types': activity_types,
                  'activity_subtypes': activity_subtypes,
                  'button_text': 'Update',
                }
              },
          });
        }else{
          activityView = new Cecilia.Common.Views.Missing({message:'This Activity Does Not Exist'});
        }

        activityView.on("activity:updated",function(activity){
          Cecilia.trigger("activity:show", activity.get('id'));
        });
        activityView.on("form:submit", function(data){
          if(activity.save(data)){
            this.trigger("activity:updated", activity);
          }else{
            this.triggerMethod("form:data:invalid", this.model.validationError);
          }
        });
        Cecilia.regions.main.show(activityView);
      });
    },
  };
});
