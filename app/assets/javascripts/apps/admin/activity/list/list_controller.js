Cecilia.module("AdminActivityApp.List", function(List, Cecilia, Backbone, Marionette, $, _){
  List.Controller = {
    listActivities: function(){
      var fetchingActivities = Cecilia.request("activity:entities");
      $.when(fetchingActivities).done(function(activities){
        var activitiesView = new List.Activities({collection:activities});


        activitiesView.on("activity:new", function(){
          var newActivity = new Cecilia.Entities.Activity({
            event_id: Cecilia.Constants.current_event_id,
            name: "",
            id: null,
          });
          var view = new List.NewModal({
            model: newActivity
          })

          this.listenTo(view, "activity:created", function(newActivity){
            activities.add(newActivity);
          });

          Cecilia.regions.dialog.show(view);
        });
        
        activitiesView.on("childview:activity:edit", function(parentArgs, args){
          var view = new List.EditModal({
            model: args.model,
          });

          this.listenTo(view, "activity:updated", function(){
            args.view.render();
          });

          Cecilia.regions.dialog.show(view);
        });

        Cecilia.regions.main.show(activitiesView);
      });
    },
  };
});
