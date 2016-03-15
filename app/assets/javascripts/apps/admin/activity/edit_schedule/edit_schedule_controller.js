Cecilia.module("AdminActivityApp.EditSchedule", function(EditSchedule, Cecilia, Backbone, Marionette, $, _){
  EditSchedule.Controller = {
    editSchedule: function(){
      var loadingView = new Cecilia.Common.Views.Loading();
      Cecilia.regions.main.show(loadingView);
      var fetchingScheduled = Cecilia.request("admin:activity:entities:scheduled");
      var fetchingUnscheduled = Cecilia.request("admin:activity:entities:unscheduled");
      var fetchingList = Cecilia.request("admin:activity:entities");
        
      $.when(fetchingScheduled,fetchingUnscheduled, fetchingList).done(function(scheduled, unscheduled, list){

        var scheduledView = new EditSchedule.Days({ collection: scheduled });
        var totalClasses = list.length + unscheduled.length;
        var unscheduledView = new EditSchedule.UnscheduledClasses({ 
          templateHelpers: function(){
            return {
              totalClasses: totalClasses,
              collection: unscheduled, 
              numCol: 4,
            }
          },
        });

        var scheduleLayout = new EditSchedule.Layout({
          scheduledView: scheduledView,
          unscheduledView: unscheduledView,
        });
        Cecilia.regions.main.show(scheduleLayout);  
      });
    },
  } 
});
