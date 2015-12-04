Cecilia.module("ActivityApp.ListAll", function(ListAll, Cecilia, Backbone, Marionette, $, _){
  ListAll.Controller = {
    listAllActivities: function(){
      var fetchingActivities = Cecilia.request("activity:entities:all");
      $.when(fetchingActivities).done(function(activities){
        var activitiesView = new ListAll.Activities({collection:activities});

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
