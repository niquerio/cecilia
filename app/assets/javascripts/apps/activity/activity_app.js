Cecilia.module("ActivityApp", function(ActivityApp, Cecilia, Backbone, Marionette, $, _){
  this.startWithParent = false;//so I can start module in order
  ActivityApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "classes" : "listActivities",
      "class_schedule" : "showActivitiesSchedule",
      "all_classes" : "listAllActivities",
      "activities/:id" : "showActivity",
    }
  });

  ActivityApp._API = {
    listActivities: function(){
      ActivityApp.List.Controller.listActivities();
    },
    listAllActivities: function(){
      ActivityApp.ListAll.Controller.listAllActivities();
    },
    showActivitiesSchedule: function(){
      ActivityApp.ShowSchedule.Controller.showActivitiesSchedule();
    },
    showActivity: function(id){
      ActivityApp.Show.Controller.showActivity(id);
    },
  };

  Cecilia.on("activity:list", function(){
    Cecilia.navigate('classes')
    ActivityApp._API.listActivities();
  });
  Cecilia.on("activity:list:all", function(){
    Cecilia.navigate('all_classes')
    ActivityApp._API.listAllActivities();
  });
  Cecilia.on("activity:showSchedule", function(){
    Cecilia.navigate('class_schedule')
    ActivityApp._API.showActivitiesSchedule();
  });
  Cecilia.on("activity:show", function(id){
    Cecilia.navigate('activities/'+id)
    ActivityApp._API.showActivity(id);
  });

  ActivityApp.on("start", function(){
    new ActivityApp.Router({
      controller: ActivityApp._API,
    });
  });
});
