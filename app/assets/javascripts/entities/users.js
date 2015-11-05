Cecilia.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){

  Entities.Teacher = Backbone.Model.extend({
    initialize: function(){
      var activities = this.get('activities');
      this.set('activities', new Entities.ActivityCollection(activities));
    },
  });
  Entities.TeacherCollection = Backbone.Collection.extend({
    model: Entities.Teacher,
  });

  Entities.StaffMember = Backbone.Model.extend({
  });

  Entities.StaffMemberCollection = Backbone.Collection.extend({
    model: Entities.StaffMember,
  });

  var initializeStaff = function(){
    Entities.staff = new Entities.StaffMemberCollection([
      { title: 'Mistress', sca_first_name: 'Jadwiga', sca_last_name: 'Krzyzanowska', staff_role: 'Event Steward' },
      { title: 'Master', sca_first_name: 'Aaron', sca_last_name: 'Drummond', staff_role: 'Event Steward' },
      { title: 'Mistress', sca_first_name: 'Arina', sca_last_name: 'Traentorp', staff_role: 'Tavern Coordinator' },
    ]);
  };

  var initializeTeachers = function(){
    Entities.teachers = new Entities.TeacherCollection([
      { title: 'Mistress', sca_first_name: 'Jadwiga', sca_last_name: 'Krzyzanowska', activities: [
        
            { 
              id: 1,
              title: 'Class 1',
              description: 'Class 1 Description',
              classroom: 'Nursery',
              start_time: '2016-04-30T09:00:00-05:00',
              end_time: '2016-04-30T10:00:00-05:00',
              difficulty: 1,
              activity_type: 'lecture',
              activity_subtype: 'vocal',
              event_id: 1,
            },
            { 
              id: 7,
              title: 'Class 7',
              description: 'Class 7 Description',
              classroom: 'Youth Room',
              start_time: '2016-04-30T11:00:00-05:00',
              end_time: '2016-04-30T12:00:00-05:00',
              difficulty: 1,
              activity_type: 'lecture',
              activity_subtype: 'vocal',
              event_id: 1,
            },
      ]},
      { title: 'Master', sca_first_name: 'Aaron', sca_last_name: 'Drummond', activities: [
            { 
              id: 2,
              title: 'Class 2',
              description: 'Class 2 Description',
              classroom: 'Partitioned Room',
              start_time: '2016-04-30T09:00:00-05:00',
              end_time: '2016-04-30T11:00:00-05:00',
              difficulty: 1,
              activity_type: 'lecture',
              activity_subtype: 'vocal',
              event_id: 1,
            },
        
      ]},
      { title: 'Lady', sca_first_name: 'Helga', sca_last_name: 'Hatter', activities: [
            { 
              id: 8,
              title: 'Class 8',
              description: 'Class 8 Description',
              classroom: 'Anderson Room',
              start_time: '2016-05-01T09:00:00-05:00',
              end_time: '2016-05-01T11:00:00-05:00',
              difficulty: 1,
              activity_type: 'lecture',
              activity_subtype: 'vocal',
              event_id: 1,
            },
      ]},
    ]);
  };

  var API = {
    getTeachers: function(){
      if(Entities.teachers == undefined){
        initializeTeachers();
      }
      return Entities.teachers;
    },
    getStaff: function(){
      if(Entities.staff == undefined){
        initializeStaff();
      }
      return Entities.staff;
    },
  }

  Cecilia.reqres.setHandler("user:entities:teachers",function(){
    return API.getTeachers();
  });
  Cecilia.reqres.setHandler("user:entities:staff",function(){
    return API.getStaff();
  });
});
