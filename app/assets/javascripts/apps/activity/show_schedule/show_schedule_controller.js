Cecilia.module("ActivityApp.ShowSchedule", function(ShowSchedule, Cecilia, Backbone, Marionette, $, _){
  ShowSchedule.Controller = {
    showActivitiesSchedule: function(){
      var fetchingSchedule = Cecilia.request("activity:entities:schedule");
      $.when(fetchingSchedule).done(function(activities){
        var scheduleView = new ShowSchedule.Activities({collection:activities});

        scheduleView.on("childview:childview:childview:showClass", function(childViewDay, childViewRows, childViewActivity){
          var view = new Cecilia.ActivityApp.Show.Activity({ model: childViewActivity.model });
          view.on("show", function(){
            this.$el.modal();
          });
          Cecilia.regions.dialog.show(view);
        });
        Cecilia.regions.main.show(scheduleView);
      });
    },
  };
});
