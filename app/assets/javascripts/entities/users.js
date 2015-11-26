Cecilia.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){
  Entities.User = Backbone.Model.extend({
    urlRoot: '/api/users',
  });
  Entities.Teacher = Backbone.Model.extend({
    initialize: function(){
      if(this.get('activities')){
        var activities = this.get('activities');
        this.set('activities', new Entities.ActivityCollection(activities));
      }
    },
  });
  Entities.CompleteTeacherCollection = Backbone.Collection.extend({
    model: Entities.Teacher,
    url: '/api/teachers',
  });

  Entities.TeacherCollection = Backbone.Collection.extend({
    url: function(){
      return '/api/events/' + encodeURIComponent(Cecilia.Constants.current_event_id) + '/teachers';
    },
    model: Entities.Teacher,
  });

  Entities.StaffMember = Backbone.Model.extend({
  });

  Entities.StaffMemberCollection = Backbone.Collection.extend({
    url: function(){
      return '/api/events/' + encodeURIComponent(Cecilia.Constants.current_event_id) + '/staff'
    },
    model: Entities.StaffMember,
  });



  var API = {
    getTeachers: function(){
      var teachers = new Entities.TeacherCollection();
      var defer = $.Deferred();
      teachers.fetch({
        success: function(data){
          defer.resolve(data)
        }
      });
      var promise = defer.promise();
      return promise;
    },
    getAllTeachers: function(){
      var teachers = new Entities.CompleteTeacherCollection();
      var defer = $.Deferred();
      teachers.fetch({
        success: function(data){
          defer.resolve(data)
        }
      });
      var promise = defer.promise();
      return promise;
    },
    getStaff: function(){
      var staff = new Entities.StaffMemberCollection();
      var defer = $.Deferred();
      staff.fetch({
        success: function(data){
          defer.resolve(data)
        }
      });
      var promise = defer.promise();
      return promise;
    },
    getUser: function(userId){
      var user = new Entities.User({id: userId});
      var defer = $.Deferred();
      user.fetch({
        success: function(data){
          defer.resolve(data)
        }
      });
      var promise = defer.promise();
      return promise;
    },
  };

  Cecilia.reqres.setHandler("user:entity",function(userId){
    return API.getUser(userId);
  });
  Cecilia.reqres.setHandler("user:entities:teachers",function(){
    return API.getTeachers();
  });
  Cecilia.reqres.setHandler("user:entities:teachers:all",function(){
    return API.getAllTeachers();
  });
  Cecilia.reqres.setHandler("user:entities:staff",function(){
    return API.getStaff();
  });
});
