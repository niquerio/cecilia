Cecilia.module("ActivityApp.ShowSchedule", function(ShowSchedule, Cecilia, Backbone, Marionette, $, _){
  ShowSchedule.Controller = {
    showActivitiesSchedule: function(){
      var activities = Cecilia.request("activity:entities:schedule");
      var scheduleView = new ShowSchedule.Activities({collection:activities});

      Cecilia.regions.main.show(scheduleView);
    },
  };
});
