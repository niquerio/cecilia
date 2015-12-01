Cecilia.module("ActivityApp.ShowSchedule", function(ShowSchedule, Cecilia, Backbone, Marionette, $, _){
  ShowSchedule.Controller = {
    _configureModal: function(){
        this.on("show", function(){
          this.$el.modal();
        });
        this.on("childview:teacher:show", function(args){
          Cecilia.trigger("teacher:show", args.model.get('username'));
          this.$el.modal('hide');
        });
    },
    _configureSchedule: function(){
      this.on("childview:childview:childview:showClass", function(childViewDay, childViewRows, childViewActivity){
        var view = new Cecilia.ActivityApp.Show.Activity({ model: childViewActivity.model });
        Cecilia.ActivityApp.ShowSchedule.Controller._configureModal.call(view);
        Cecilia.regions.dialog.show(view);
      });
    },
    showActivitiesSchedule: function(){
      var fetchingSchedule = Cecilia.request("activity:entities:schedule");
      $.when(fetchingSchedule).done(function(activities){
        var scheduleView = new ShowSchedule.Activities({collection:activities});
        ShowSchedule.Controller._configureSchedule.call(scheduleView)
        Cecilia.regions.main.show(scheduleView);
      });
    },
  };
});
