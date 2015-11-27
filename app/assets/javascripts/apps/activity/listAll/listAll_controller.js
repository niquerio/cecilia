Cecilia.module("ActivityApp.ListAll", function(ListAll, Cecilia, Backbone, Marionette, $, _){
  ListAll.Controller = {
    listAllActivities: function(){
      var fetchingActivities = Cecilia.request("activity:entities:all");
      $.when(fetchingActivities).done(function(activities){
        var activitiesView = new ListAll.Activities({collection:activities});

        Cecilia.regions.main.show(activitiesView);
      });
    },
  };
});
