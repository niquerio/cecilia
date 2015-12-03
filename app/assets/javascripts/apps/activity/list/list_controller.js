Cecilia.module("ActivityApp.List", function(List, Cecilia, Backbone, Marionette, $, _){
  List.Controller = {
    listActivities: function(){
      var fetchingActivities = Cecilia.request("activity:entities");
      $.when(fetchingActivities).done(function(activities){
        var activitiesView = new List.Activities({collection:activities});

        activitiesView.on("childview:childview:teacher:show", function(parentArgs, childArgs){
          Cecilia.trigger("teacher:show", childArgs.model.get('username'));
        });
        activitiesView.on("childview:activity:show", function(args){
          Cecilia.trigger("activity:show", args.model.get('id'));
        });
        Cecilia.regions.main.show(activitiesView);
      });
    },
  };
});
