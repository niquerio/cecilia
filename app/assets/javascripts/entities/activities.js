Cecilia.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){
  Entities.Activity = Backbone.Model.extend({
    urlRoot: '/api/activities', 
    initialize: function(){
      if(this.get('teachers')){
        var teachers = this.get('teachers');
        this.set('teachers', new Entities.TeacherCollection(teachers));
      }
    },
    defaults: {
      title: null,
      description: "",
      activity_type: "",
      activity_subtype: "",
      difficulty: "",
      teachers: null,
    },
    validate: function(attrs, options){
      var errors = {}
      if(! attrs.title){
        errors.name = "can't be blank";
      }
      if(! _.isEmpty(errors)){
        return errors;
      }
    },
  });
  Entities.CompleteActivityCollection = Backbone.Collection.extend({
    url: '/api/activities',
    model: Entities.Activity,
    comparator: function(a, b){
      var aYear = a.get("year");  
      var bYear =  b.get("year");
      if (aYear === bYear){
        var aTitle = a.get('title');
        var bTitle = b.get('title');
        if( aTitle == bTitle) {return 0;}
        if( aTitle < bTitle) {return -1} else{ return 1; } }
      else{
        if(aYear < bYear) { return 1; }
        else{ return -1; }
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
      return this._getPromise(activities);
    },

    getAllActivities: function(){
      var activities = new Entities.CompleteActivityCollection();
      return this._getPromise(activities);
    },
    getActivity: function(activityId){
      var activity = new Entities.Activity({id: activityId});
      var defer = $.Deferred();
      activity.fetch({
        success: function(data){
          data.initialize();
          defer.resolve(data)
        }
      });
      return defer.promise();
    },
    getSchedule: function(){
      var schedule = new Entities.ScheduleDayCollection();
      return this._getPromise(schedule);
    },

    _getPromise: function(item){
      var defer = $.Deferred();
      item.fetch({
        success: function(data){
          defer.resolve(data)
        }
      });
      return defer.promise();
    },
  }


  Cecilia.reqres.setHandler("activity:entities",function(){
    return API.getActivities();
  });
  Cecilia.reqres.setHandler("activity:entities:all",function(){
    return API.getAllActivities();
  });
  Cecilia.reqres.setHandler("activity:entity",function(id){
    return API.getActivity(id);
  });
  Cecilia.reqres.setHandler("activity:entities:schedule",function(){
    return API.getSchedule();
  });
});
