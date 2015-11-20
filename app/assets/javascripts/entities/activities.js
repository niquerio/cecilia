Cecilia.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){
  Entities.Activity = Backbone.Model.extend({
    urlRoot: '/api/activities', 
    initialize: function(){
      if(this.get('teachers')){
        var teachers = this.get('teachers');
        this.set('teachers', new Entities.TeacherCollection(teachers));
      }
    },
  });
  Entities.ActivityCollection = Backbone.Collection.extend({
    url: function(){
      return '/api/events/' + encodeURIComponent(Cecilia.Constants.current_event_id) + '/activities'
    },
    model: Entities.Activity,
    comparator: function(a, b){
      var aStart = a.get("start_time");
      var bStart =  b.get("start_time");
      if (aStart === bStart){
        var aClassroom = a.get('classroom');
        var bClassroom = b.get('classroom');
        if( aClassroom == bClassroom) {return 0;}
        if( aClassroom < bClassroom) {return -1}
        else{ return 1; }
      }
      else{
        if(aStart < bStart) { return -1; }
        else{ return 1; }
      }
    },
  });

  Entities.ScheduleHour = Backbone.Model.extend({
    initialize: function(){
      var activities = this.get('activities');
      this.set('activities', new Entities.ActivityCollection(activities));
    },
  });
  Entities.ScheduleHourCollection = Backbone.Collection.extend({
    model: Entities.ScheduleHour,
  });

  Entities.ScheduleDay = Backbone.Model.extend({
    initialize: function(){
      var hours = this.get('hours');
      this.set('hours', new Entities.ScheduleHourCollection(hours));
    },
  });
  Entities.ScheduleDayCollection = Backbone.Collection.extend({
    model: Entities.ScheduleDay,
    url: function(){
      return '/api/events/' + encodeURIComponent(Cecilia.Constants.current_event_id) + '/activities/schedule'
    },
  });


  var API = {
    getActivities: function(){
      var activities = new Entities.ActivityCollection();
      var defer = $.Deferred();
      activities.fetch({
        success: function(data){
          defer.resolve(data)
        }
      });
      var promise = defer.promise();
      return promise;
    },

    getActivity: function(activityId){
      var activity = new Entities.Activity({id: activityId});
      var defer = $.Deferred();
      activity.fetch({
        success: function(data){
          defer.resolve(data)
        }
      });
      var promise = defer.promise();
      return promise;
    },
    getSchedule: function(){
      var schedule = new Entities.ScheduleDayCollection();
      var defer = $.Deferred();
      schedule.fetch({
        success: function(data){
          defer.resolve(data)
        }
      });
      var promise = defer.promise();
      return promise;
    },
  }


  Cecilia.reqres.setHandler("activity:entities",function(){
    return API.getActivities();
  });
  Cecilia.reqres.setHandler("activity:entity",function(id){
    return API.getActivity(id);
  });
  Cecilia.reqres.setHandler("activity:entities:schedule",function(){
    return API.getSchedule();
  });
});
