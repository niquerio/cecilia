Cecilia.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){
  Entities.Classroom = Backbone.Model.extend({
    url: function(){
      return Cecilia.Constants.apiPrefix + 'admin/classrooms/' + encodeURIComponent(this.attributes.id); 
    },
    validate: function(attrs, options){
      var errors = {}
      if(! attrs.name){
        errors.name = "can't be blank";
      }
      if(! _.isEmpty(errors)){
        return errors;
      }
    },
  });
  Entities.ClassroomCollection = Backbone.Collection.extend({
    url: function(){
      return Cecilia.Constants.apiPrefix + 'admin/events/' + encodeURIComponent(Cecilia.Constants.current_event_id) + '/classrooms'
    },
    model: Entities.Classroom,
  });


  var API = {
    getClassrooms: function(){
      var classrooms = new Entities.ClassroomCollection();
      return this._getPromise(classrooms);
    },

    getClassroom: function(classroom_id){
      var classroom = new Entities.Classroom({id: classroom_id});
      return this._getPromise(classroom);
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


  Cecilia.reqres.setHandler("classroom:entities",function(){
    return API.getClassrooms();
  });
  Cecilia.reqres.setHandler("classroom:entity",function(id){
    return API.getClassroom(id);
  });
});
