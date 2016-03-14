Cecilia.module("AdminActivityApp.EditSchedule", function(EditSchedule, Cecilia, Backbone, Marionette, $, _){
  EditSchedule.Controller = {
    editSchedule: function(){
      var loadingView = new Cecilia.Common.Views.Loading();
      Cecilia.regions.main.show(loadingView);
      var fetchingScheduled = Cecilia.request("admin:activity:entities:scheduled");
      var fetchingUnscheduled = Cecilia.request("admin:activity:entities:unscheduled");
        
      $.when(fetchingScheduled,fetchingUnscheduled).done(function(scheduled, unscheduled){

        var scheduledView = new EditSchedule.Days({ collection: scheduled });
        var unscheduledView = new EditSchedule.UnscheduledClasses({ collection: unscheduled });

        var scheduleLayout = new EditSchedule.Layout({
          scheduledView: scheduledView,
          unscheduledView: unscheduledView,
        });
        Cecilia.regions.main.show(scheduleLayout);  
      });
    },
  } 
});
