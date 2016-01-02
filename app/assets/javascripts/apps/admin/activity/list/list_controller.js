Cecilia.module("AdminActivityApp.List", function(List, Cecilia, Backbone, Marionette, $, _){
  List.Controller = {
    listActivities: function(){
      var fetchingActivities = Cecilia.request("admin:activity:entities");
      $.when(fetchingActivities).done(function(activities){
        var activitiesView = new List.Activities({collection:activities});

        activitiesView.on("activity:new", function(){
          var self = this;
          var fetchingUsers = Cecilia.request("user:entities");
          var fetchingDifficulties = Cecilia.request("difficulty:entities");
          var fetchingActivityTypes = Cecilia.request("activity_type:entities");
          var fetchingActivitySubtypes = Cecilia.request("activity_subtype:entities");
          $.when(fetchingUsers, fetchingDifficulties, fetchingActivityTypes, fetchingActivitySubtypes).done(function(users, difficulties, activity_types, activity_subtypes){
            var newActivity = new Cecilia.Entities.AdminActivity({
              event_id: Cecilia.Constants.current_event_id,
            });
            var view = new List.NewModal({
              model: newActivity,
              templateHelpers: function(){
                return {
                  'modal_title': 'New Activity',
                  'users': users,
                  'difficulties': difficulties,
                  'activity_types': activity_types,
                  'activity_subtypes': activity_subtypes,
                  'button_text': 'Create',
                }
              },
            })

            self.listenTo(newActivity, "sync", function(){
              newActivity.initialize();
            });
            self.listenTo(view, "activity:created", function(newActivity){
              activities.add(newActivity);
            });

            Cecilia.regions.dialog.show(view);
            });
        });
        activitiesView.on("childview:activity:show", function(parentArgs, args){
          Cecilia.trigger("activity:show",args.model.get('id'));
        }); 
        activitiesView.on("childview:activity:edit", function(parentArgs, args){
          var self = this;
          var fetchingUsers = Cecilia.request("user:entities");
          var fetchingDifficulties = Cecilia.request("difficulty:entities");
          var fetchingActivityTypes = Cecilia.request("activity_type:entities");
          var fetchingActivitySubtypes = Cecilia.request("activity_subtype:entities");
          $.when(fetchingUsers, fetchingDifficulties, fetchingActivityTypes, fetchingActivitySubtypes).done(function(users, difficulties, activity_types, activity_subtypes){
            var view = new List.EditModal({
              model: args.model,
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

            self.listenTo(args.model, "sync", function(){
              args.model.initialize();
            });
            self.listenTo(view, "activity:updated", function(){
              args.view.render();
            });

            Cecilia.regions.dialog.show(view);
          });
        });

        activitiesView.on("childview:activity:delete", function(parentArgs, args){
          var view = new List.ConfirmModal({
            model: args.model,
          });
          this.listenTo(view, "confirm:delete", function(){
            args.model.destroy();
          });
          Cecilia.regions.dialog.show(view);
        });

        Cecilia.regions.main.show(activitiesView);
      });
    },
  };
});
