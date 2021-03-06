Cecilia.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){
  Entities.AdminActivity = Backbone.Model.extend({
    url: function(){
      var url_string = Cecilia.Constants.apiPrefix + 'admin/activities/';
      if(this.attributes.id){
        url_string = url_string + encodeURIComponent(this.attributes.id); 
      }
      return url_string 
    },
    initialize: function(){
      var self = this;
      this._create_teacher_collection();
    },
    _create_teacher_collection: function(){
      if(this.get('teachers')){
        var teachers = this.get('teachers');
        this.set('teachers', new Entities.TeacherCollection(teachers));
      }
    },
    defaults: {
      id: null,
      title: "",
      description: "",
      activity_type: "",
      activity_subtype: "",
      difficulty: "",
      duration: 60,
      teachers: null,
      users: null,
    },
    validate: function(attrs, options){
      var errors = {}
      if(! attrs.title){
        errors.title = "can't be blank";
      }
      if(_.isEmpty(attrs.users)){
        errors.users = "must have teacher";
      }
      if(! _.isEmpty(errors)){
        return errors;
      }
    },
  });
  Entities.AdminActivityCollection = Backbone.Collection.extend({
    url: function(){
      return Cecilia.Constants.apiPrefix + 'admin/events/' + encodeURIComponent(Cecilia.Constants.current_event_id) + '/activities'
    },
    model: Entities.AdminActivity,
    comparator: 'title',
  });
  Entities.Activity = Backbone.Model.extend({
    url: function(){
     return  Cecilia.Constants.apiPrefix + 'activities/' + encodeURIComponent(this.attributes.id); 
    },
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
    url: function(){
      return Cecilia.Constants.apiPrefix + 'activities';
    },
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
      return Cecilia.Constants.apiPrefix + 'events/' + encodeURIComponent(Cecilia.Constants.current_event_id) + '/activities'
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
      return Cecilia.Constants.apiPrefix + 'events/' + encodeURIComponent(Cecilia.Constants.current_event_id) + '/activities/schedule'
    },
  });

  Entities.AdminScheduleHour = Backbone.Model.extend({
    initialize: function(){
      var activities = this.get('activities');
      this.set('activities', new Entities.AdminScheduleActivityCollection(activities));
    }
  });

  Entities.AdminScheduleActivityCollection = Backbone.Collection.extend({
    model: Entities.AdminActivity,
  })

  Entities.AdminScheduleHourCollection = Backbone.Collection.extend({
    model: Entities.AdminScheduleHour,
  });

  Entities.AdminScheduleDay = Backbone.Model.extend({
    initialize: function(){
      var hours = this.get('hours');
      this.set('hours', new Entities.AdminScheduleHourCollection(hours));
    },
  });

  Entities.AdminScheduleDayCollection = Backbone.Collection.extend({
    model: Entities.AdminScheduleDay,
    url: function(){
      return Cecilia.Constants.apiPrefix + 'admin/events/' + encodeURIComponent(Cecilia.Constants.current_event_id) + '/activities/scheduled'
    },
    
  });
  Entities.AdminUnscheduledActivityCollection = Backbone.Collection.extend({
    model: Entities.AdminActivity,
    url: function(){
      return Cecilia.Constants.apiPrefix + 'admin/events/' + encodeURIComponent(Cecilia.Constants.current_event_id) + '/activities/unscheduled'
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
    getAdminActivities: function(){
      var activities = new Entities.AdminActivityCollection();
      return this._getPromise(activities);
    },
    getAdminActivity: function(activityId){
      var activity = new Entities.AdminActivity({id: activityId});
      var defer = $.Deferred();
      activity.fetch({
        success: function(data){
          data.initialize();
          defer.resolve(data)
        },
        error: function(){
          defer.resolve();
        },
      });
      return defer.promise();
    },
    getActivity: function(activityId){
      var activity = new Entities.Activity({id: activityId});
      var defer = $.Deferred();
      activity.fetch({
        success: function(data){
          data.initialize();
          defer.resolve(data)
        },
        error: function(){
          defer.resolve();
        },
      });
      return defer.promise();
    },
    getSchedule: function(){
      var schedule = new Entities.ScheduleDayCollection();
      return this._getPromise(schedule);
    },

    getAdminScheduled: function(){
      var schedule = new Entities.AdminScheduleDayCollection();
      return this._getPromise(schedule);
    },
    getAdminUnscheduled: function(){
      var schedule = new Entities.AdminUnscheduledActivityCollection();
      return this._getPromise(schedule);
    },
    _getPromise: function(item){
      var defer = $.Deferred();
      item.fetch({
        success: function(data){
          defer.resolve(data)
        },
        error: function(){
          defer.resolve();
        },
      });
      return defer.promise();
    },
  }


  Cecilia.reqres.setHandler("admin:activity:entity",function(id){
    return API.getAdminActivity(id);
  });
  Cecilia.reqres.setHandler("admin:activity:entities",function(){
    return API.getAdminActivities();
  });
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
  Cecilia.reqres.setHandler("admin:activity:entities:scheduled",function(){
    return API.getAdminScheduled();
  });
  Cecilia.reqres.setHandler("admin:activity:entities:unscheduled",function(){
    return API.getAdminUnscheduled();
  });
});
