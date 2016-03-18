Cecilia.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){
  Entities.User = Backbone.Model.extend({ });
  Entities.UserCollection = Backbone.Collection.extend({
    model: Entities.User,
    url: function(){ return Cecilia.Constants.apiPrefix + 'users'},
    comparator: function(user) {
      return user.get("sca_first_name") + " " + user.get("sca_last_name");
    },
  });

  Entities.AdminUser = Backbone.Model.extend({ 
    url: function(){
      var url_string = Cecilia.Constants.apiPrefix + 'admin/users/';
      if(this.attributes.id){
        url_string = url_string + encodeURIComponent(this.attributes.id); 
      }
      return url_string 
    },
    defaults: {
      username: '',
      sca_first_name: '',
      email: '',
      sca_last_name: '',
      modern_first_name: '',
      modern_last_name: '',
      title_id: 1,
      bio: '',
    
    },
    validate: function(attrs, options){
      var email_address_pattern = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i 
     
      var errors = {}

      if(! attrs.sca_first_name){
        errors.sca_first_name = "can't be blank";
      }
      if(! attrs.sca_last_name){
        errors.sca_last_name = "can't be blank";
      }

      if(! attrs.username){
        errors.username = "can't be blank";
      }else if(/\s/.test(attrs.username)){
        errors.username = "can't have spaces"
      }else if(/\d/.test(attrs.username)){
        errors.username = "can't have numbers"
      }else if(attrs.username.toLowerCase() != attrs.username){
        errors.username = "must be all lowercase"
      }

      if(! attrs.email){
        errors.email = "can't be blank";
      }else if(! email_address_pattern.test(attrs.email) ){
        errors.email = "invalid email address";
      }
      if(! _.isEmpty(errors)){
        return errors;
      }
      
    },
  });
  Entities.AdminUserCollection = Backbone.Collection.extend({
    model: Entities.AdminUser,
    url: function(){ return Cecilia.Constants.apiPrefix + 'admin/users'},
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
    getAdminUsers: function(){
      var users = new Entities.AdminUserCollection();
      return this._getPromise(users)
    },
    getAdminUser: function(id){
      var user = new Entities.AdminUser({id: id});
      return this._getPromise(user)
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
  Cecilia.reqres.setHandler("admin:user:entities",function(){
    return API.getAdminUsers();
  });
  Cecilia.reqres.setHandler("admin:user:entity",function(id){
    return API.getAdminUser(id);
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
