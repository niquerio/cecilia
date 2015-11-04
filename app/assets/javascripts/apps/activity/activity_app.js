Cecilia.module("ActivityApp", function(ActivityApp, Cecilia, Backbone, Marionette, $, _){
  ActivityApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "classes" : "listActivities",
      "class_schedule" : "showActivitiesSchedule",
    }
  });

  var API = {
    listActivities: function(){
      ActivityApp.List.Controller.listActivities();
    },
    showActivitiesSchedule: function(){
      ActivityApp.ShowSchedule.Controller.showActivitiesSchedule();
    },
  };

  Cecilia.on("menu:activity:list", function(){
    Cecilia.navigate('classes')
    API.listActivities();
  });
  Cecilia.on("menu:activity:showSchedule", function(){
    Cecilia.navigate('class_schedule')
    API.showActivitiesSchedule();
  });

  ActivityApp.on("start", function(){
    new ActivityApp.Router({
      controller: API,
    });
  });
});
