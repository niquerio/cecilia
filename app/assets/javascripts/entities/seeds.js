Cecilia.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){
  Entities.ActivityType = Backbone.Model.extend({ });
  Entities.ActivityTypeCollection = Backbone.Collection.extend({
    model: Entities.ActivityType,
    url: 'api/activity_types',
    comparator: 'name',    
  });
  Entities.ActivitySubtype = Backbone.Model.extend({ });
  Entities.ActivitySubtypeCollection = Backbone.Collection.extend({
    model: Entities.ActivitySubtype,
    url: 'api/activity_subtypes',
    comparator: 'name',    
  });

  var API = {
    getActivityTypes: function(){
      var activity_types = new Entities.ActivityTypeCollection();
      return this._getPromise(activity_types)
    },
    getActivitySubtypes: function(){
      var activity_subtypes = new Entities.ActivitySubtypeCollection();
      return this._getPromise(activity_subtypes)
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
  };

  Cecilia.reqres.setHandler("activity_type:entities",function(){
    return API.getActivityTypes();
  });
  Cecilia.reqres.setHandler("activity_subtype:entities",function(){
    return API.getActivitySubtypes();
  });
});
