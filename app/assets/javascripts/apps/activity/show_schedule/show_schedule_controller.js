Cecilia.module("ActivityApp.ShowSchedule", function(ShowSchedule, Cecilia, Backbone, Marionette, $, _){
  ShowSchedule.Controller = {
    showActivitiesSchedule: function(){
      var fetchingSchedule = Cecilia.request("activity:entities:schedule");
      $.when(fetchingSchedule).done(function(activities){
        var scheduleView = new ShowSchedule.Activities({collection:activities});

        Cecilia.regions.main.show(scheduleView);
      });
    },
  };
});
