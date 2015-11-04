Cecilia.module("ActivityApp.ShowSchedule", function(ShowSchedule, Cecilia, Backbone, Marionette, $, _){
  ShowSchedule.Activity = Marionette.ItemView.extend({
    template: "activity/show_schedule_item",
    tagName: "td",
    attributes: function(){
      var start = new Date(this.model.get('start_time'));
      var end = new Date(this.model.get('end_time'));
      var length = Math.floor(end - start)/(1000*60*60);
      if( length > 1){
        return { 'rowspan': length,}
      }
    },
  });
  ShowSchedule.ActivitiesRow = Marionette.CompositeView.extend({
    tagName: "tr",
    template: "activity/show_schedule_row",
    childView: ShowSchedule.Activity,
    initialize: function(){
      this.collection = this.model.get('activities');
    },
  });
  ShowSchedule.ActivitiesDay = Marionette.CompositeView.extend({
    template: "activity/show_schedule_day",
    templateHelpers: function(){
      return {
        classrooms:  this.collection.first().get('activities').pluck('classroom'), 
        day: this.collection.first().get('activities').first().get('start_time'),
      }
    },
    childView: ShowSchedule.ActivitiesRow,
    childViewContainer: "tbody",
    initialize: function(){
      this.collection = this.model.get('hours');
    },
  });

  ShowSchedule.Activities = Marionette.CompositeView.extend({
    template: "activity/show_schedule",
    childView: ShowSchedule.ActivitiesDay,
    childViewContainer: "div",
    
  });
    
});
