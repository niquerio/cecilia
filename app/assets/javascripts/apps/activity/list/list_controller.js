Cecilia.module("ActivityApp.List", function(List, Cecilia, Backbone, Marionette, $, _){
  List.Controller = {
    listActivities: function(){
      var activities = Cecilia.request("activity:entities");
      var activitiesView = new List.Activities({collection:activities});

      Cecilia.regions.main.show(activitiesView);
    },
  };
});
