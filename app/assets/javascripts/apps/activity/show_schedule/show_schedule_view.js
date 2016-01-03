Cecilia.module("ActivityApp.ShowSchedule", function(ShowSchedule, Cecilia, Backbone, Marionette, $, _){
  ShowSchedule.Teacher = Marionette.ItemView.extend({
    template: "activity/show_schedule_teacher",
    tagName: "span",
  });
  ShowSchedule.Activity = Marionette.CompositeView.extend({
    template: "activity/show_schedule_item",
    tagName: "td",
    triggers: {
      "click" : "showClass",
    },
    className: function(){
      if(this.model.has('difficulty')) {
        return "activity-cell" // level-" + this.model.get('difficulty')
      }
    },
    childView: ShowSchedule.Teacher,
    childViewContainer: ".teachers",
    attributes: function(){
      var start = new Date(this.model.get('start_time'));
      var end = new Date(this.model.get('end_time'));
      var length = Math.floor(end - start)/(1000*60*60);
      if( length > 1){
        return { 'rowspan': length,}
      }
    },
    initialize: function(){
      this.collection = this.model.get('teachers');
    },
    onRender: function(){
      var last_entry = this.$('.teachers').children().last().html();
      if(typeof last_entry !== 'undefined'){
        this.$('.teachers').children().last().html(last_entry.replace(/,\s*$/,''));
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
    childViewContainer: ".schedule",
    
  });
    
});
