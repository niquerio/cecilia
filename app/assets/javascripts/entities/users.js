Cecilia.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){
  Entities.User = Backbone.Model.extend({ });
  Entities.UserCollection = Backbone.Collection.extend({
    model: Entities.User,
    url: function(){ return Cecilia.Constants.apiPrefix + 'users'},
    comparator: function(user) {
      return user.get("sca_first_name") + " " + user.get("sca_last_name");
    },
  });

  
  Entities.Teacher = Backbone.Model.extend({
    url: function(){ return Cecilia.Constants.apiPrefix + 'teachers/' + this.get('username') }, 
    initialize: function(){
      if(this.get('activities')){
        var activities = this.get('activities');
        this.set('activities', new Entities.CompleteActivityCollection(activities));
      }
    },
  });
  Entities.CompleteTeacherCollection = Backbone.Collection.extend({
    model: Entities.Teacher,
    url: function(){ return Cecilia.Constants.apiPrefix + 'teachers'},
    comparator: function(teacher) {
      return teacher.get("sca_first_name") + " " + teacher.get("sca_last_name");
    },
  });

  Entities.TeacherCollection = Backbone.Collection.extend({
    url: function(){
      return Cecilia.Constants.apiPrefix + 'events/' + encodeURIComponent(Cecilia.Constants.current_event_id) + '/teachers';
    },
    model: Entities.Teacher,
  });

  Entities.StaffMember = Backbone.Model.extend({
  });

  Entities.StaffMemberCollection = Backbone.Collection.extend({
    url: function(){
      return Cecilia.Constants.apiPrefix + 'events/' + encodeURIComponent(Cecilia.Constants.current_event_id) + '/staff'
    },
    model: Entities.StaffMember,
  });



  var API = {
    getUsers: function(){
      var users = new Entities.UserCollection();
      return this._getPromise(users)
    },
    getTeachers: function(){
      var teachers = new Entities.TeacherCollection();
      return this._getPromise(teachers)
    },
    getAllTeachers: function(){
      var teachers = new Entities.CompleteTeacherCollection();
      return this._getPromise(teachers)
    },
    getStaff: function(){
      var staff = new Entities.StaffMemberCollection();
      return this._getPromise(staff)
    },
    getTeacher: function(username){
      var teacher = new Entities.Teacher({username: username});
      var defer = $.Deferred();
      teacher.fetch({
        success: function(data){
          data.initialize();
          defer.resolve(data)
        },
        error: function(){
          defer.resolve()
        },
      });
      return defer.promise();
    },
    _getPromise: function(item){
      var defer = $.Deferred();
      item.fetch({
        success: function(data){
          defer.resolve(data)
        },
        error: function(){
          defer.resolve()
        },
      });
      return defer.promise();
    },
  };

  Cecilia.reqres.setHandler("user:entities",function(){
    return API.getUsers();
  });
  Cecilia.reqres.setHandler("teacher:entity",function(username){
    return API.getTeacher(username);
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
