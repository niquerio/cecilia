Cecilia.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){
  Entities.Activity = Backbone.Model.extend({
  });
  Entities.ActivityCollection = Backbone.Collection.extend({
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
  });

  var initializeSchedule = function(){
    Entities.schedule = new Entities.ScheduleDayCollection([
      { hours: [
        { time: '2016-04-30T09:00:00-05:00', activities: [
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
            { 
              id: 3,
              title: 'Class 3',
              description: 'Class 3 Description',
              classroom: 'Youth Room',
              start_time: '2016-04-30T09:00:00-05:00',
              end_time: '2016-04-30T10:00:00-05:00',
              difficulty: 1,
              activity_type: 'lecture',
              activity_subtype: 'vocal',
              event_id: 1,
            },
          ],
        },
        { time: '2016-04-30T10:00:00-05:00', activities: [
            { 
              id: 4,
              title: 'Class 4',
              description: 'Class 4 Description',
              classroom: 'Nursery',
              start_time: '2016-04-30T10:00:00-05:00',
              end_time: '2016-04-30T11:00:00-05:00',
              difficulty: 1,
              activity_type: 'lecture',
              activity_subtype: 'vocal',
              event_id: 1,
            },
            { 
              id: 5,
              title: 'Class 5',
              description: 'Class 5 Description',
              classroom: 'Youth Room',
              start_time: '2016-04-30T10:00:00-05:00',
              end_time: '2016-04-30T11:00:00-05:00',
              difficulty: 1,
              activity_type: 'lecture',
              activity_subtype: 'vocal',
              event_id: 1,
            },
          ],
        },
        { time: '2016-04-30T11:00:00-05:00', activities: [
            { 
              id: 6,
              title: 'Class 6',
              description: 'Class 6 Description',
              classroom: 'Nursery',
              start_time: '2016-04-30T11:00:00-05:00',
              end_time: '2016-04-30T12:00:00-05:00',
              difficulty: 1,
              activity_type: 'lecture',
              activity_subtype: 'vocal',
              event_id: 1,
            },
            { 
              title: '',
              description: '',
              classroom: 'Partitioned Room',
              start_time: '2016-04-30T11:00:00-05:00',
              end_time: '2016-04-30T12:00:00-05:00',
              difficulty: '',
              activity_type: '',
              activity_subtype: '',
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
          ],
        },
      ],
    },
    {
      hours: [ 
        { time: '2016-05-01T09:00:00-05:00', activities: [
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
          ],
        },
        { time: '2016-05-01T10:00:00-05:00', activities: [
          ],
        }
      ]
    },
    ]);
  };

  var initializeActivities = function(){
    Entities.activities = new Entities.ActivityCollection([
{
  id: 2,
  title: 'Worst Class',
  description: "This is definitely NOT the best class.",
  difficulty: 5,
  activity_type: 'lecture',
  activity_subtype: 'instrumental',
  event_id: 1,
  start_time: '2016-04-30T10:00:00-05:00',
  end_time: '2016-04-30T11:00:00-05:00',
  classroom: 'Nursery'
},
{
  id: 1,
  title: 'Best Class',
  description: "This is definitely the best class.",
  difficulty: 2,
  activity_type: 'lecture',
  activity_subtype: 'vocal',
  event_id: 1,
  start_time: '2016-04-30T10:00:00-05:00',
  end_time: '2016-04-30T11:00:00-05:00',
  classroom: 'Nursery'
},
{
  id: 3,
  title: 'A Class',
  description: "This is definitely a class.",
  difficulty: 1,
  activity_type: 'lecture',
  activity_subtype: '',
  event_id: 1,
  start_time: '2016-04-30T11:00:00-05:00',
  end_time: '2016-04-30T12:00:00-05:00',
  classroom: 'Youth Room'
},
    ]);
  };

  var API = {
    getActivities: function(){
      if(Entities.activities == undefined){
        initializeActivities();
      }
      return Entities.activities
    },

   getActivity: function(id){
      if(Entities.activities == undefined){
        initializeActivities();
      }
      return Entities.pages.find(id);
    },
   getSchedule: function(){
    if(Entities.schedule == undefined){
      initializeSchedule();
    }
    return Entities.schedule;
   },
  }


  Cecilia.reqres.setHandler("activity:entities",function(){
    return API.getActivities();
  });
  Cecilia.reqres.setHandler("activity:entity",function(id){
    return API.getActivity(slug);
  });
  Cecilia.reqres.setHandler("activity:entities:schedule",function(){
    return API.getSchedule();
  });
});
