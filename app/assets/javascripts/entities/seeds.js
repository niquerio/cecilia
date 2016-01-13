Cecilia.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){
  Entities.ActivityType = Backbone.Model.extend({ });
  Entities.ActivityTypeCollection = Backbone.Collection.extend({
    model: Entities.ActivityType,
    url: Cecilia.Constants.apiPrefix + 'activity_types',
    comparator: 'name',    
  });
  Entities.ActivitySubtype = Backbone.Model.extend({ });
  Entities.ActivitySubtypeCollection = Backbone.Collection.extend({
    model: Entities.ActivitySubtype,
    url: Cecilia.Constants.apiPrefix + 'activity_subtypes',
    comparator: 'name',    
  });

  Entities.Difficulty = Backbone.Model.extend({ });
  Entities.DifficultyCollection = Backbone.Collection.extend({
    model: Entities.Difficulty,
    url: Cecilia.Constants.apiPrefix + 'difficulties',
    comparator: 'level',    
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
    getDifficulties: function(){
      var difficulties = new Entities.DifficultyCollection();
      return this._getPromise(difficulties)
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
  Cecilia.reqres.setHandler("difficulty:entities",function(){
    return API.getDifficulties();
  });
});
