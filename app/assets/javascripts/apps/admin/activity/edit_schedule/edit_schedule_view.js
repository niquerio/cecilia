Cecilia.module("AdminActivityApp.EditSchedule", function(EditSchedule, Cecilia, Backbone, Marionette, $, _){
  EditSchedule.Layout = Marionette.LayoutView.extend({
    template: "admin/scheduler/scheduler_layout",
    regions: {
      scheduledRegion: "#scheduled-region",
      unscheduledRegion: "#unscheduled-region",
    },
    initialize: function(options){
      this.on("show", function(){
        this.scheduledRegion.show(this.getOption("scheduledView"));
        this.unscheduledRegion.show(this.getOption("unscheduledView"));
        REDIPS.drag.init()
      });
      
      var rd = REDIPS.drag;
      var self = this;
      rd.event.dropped = function(){
        var td = rd.td.target;
        var td_id = td.getAttribute('id');
        var info = []
        if(td_id){ 
          info = td_id.split('_');
        }
        else{
          info[0] = null;
          info[1] = null;
        }
        var classroom_id = info[0];
        var start_time = info[1]; 
        var activity_id = td.children.item(td.children.length-1).getAttribute('id');
        var activity = new Cecilia.Entities.AdminActivity({
          id: activity_id,
        });
        activity.set({start_time: start_time, classroom_id: classroom_id});
        activity.save({start_time: start_time, classroom_id: classroom_id}, 
          { 
            patch: true,
            validate: false,
          }
        );
      };
    },
  });
  
  EditSchedule.UnscheduledClass = Marionette.ItemView.extend({
    template: "admin/scheduler/unscheduled_class",
    tagName: "div",
    className: "redips-drag",
    id: function(){
      return this.model.get('id')
    },
  });
  EditSchedule.UnscheduledClasses = Marionette.CompositeView.extend({
    template: "admin/scheduler/unscheduled_classes",
    childView: EditSchedule.UnscheduledClass,
    childViewContainer: "td",
  });

  EditSchedule.Activity = Marionette.ItemView.extend({
    template: "admin/scheduler/schedule_activity",
    tagName: "td",
    id: function(){
      return this.model.get('classroom_id') + '_' + this.model.get('start_time')
    },
  });
  EditSchedule.ActivitiesRow = Marionette.CompositeView.extend({
    tagName: "tr",
    template: "admin/scheduler/schedule_row",
    childView: EditSchedule.Activity,
    initialize: function(){
      this.collection = this.model.get('activities');
    },
  });
  EditSchedule.Day = Marionette.CompositeView.extend({
    template: "admin/scheduler/day",
    templateHelpers: function(){
      return {
        classrooms:  this.collection.first().get('activities').pluck('classroom_name'), 
        day: this.collection.first().get('activities').first().get('start_time'),
      }
    },
    childView: EditSchedule.ActivitiesRow,
    childViewContainer: "tbody",
    initialize: function(){
      this.collection = this.model.get('hours');
    },
  });
  EditSchedule.Days = Marionette.CollectionView.extend({
    childView: EditSchedule.Day,
  });



});
