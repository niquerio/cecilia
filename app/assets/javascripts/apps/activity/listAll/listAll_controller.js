Cecilia.module("ActivityApp.ListAll", function(ListAll, Cecilia, Backbone, Marionette, $, _){
  ListAll.Controller = {
    listAllActivities: function(){
      var loadingView = new Cecilia.Common.Views.Loading();
      Cecilia.regions.main.show(loadingView);
      var fetchingActivities = Cecilia.request("activity:entities:all");
      $.when(fetchingActivities).done(function(activities){
        var activitiesView = new ListAll.Activities({collection:activities});

        activitiesView.on("childview:childview:teacher:show", function(parentArgs, childArgs){
          Cecilia.trigger("teacher:show", childArgs.model.get('username'));
        });
        activitiesView.on("childview:activity:edit", function(args){
          Cecilia.trigger("admin:activity:edit", args.model.get('id'));
        });
        activitiesView.on("childview:activity:show", function(args){
          Cecilia.trigger("activity:show", args.model.get('id'));
        });
        Cecilia.regions.main.show(activitiesView);
      });
    },
  };
});
