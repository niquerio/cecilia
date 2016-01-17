Cecilia.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){
  Entities.Page = Backbone.Model.extend({
    url: function(){
      return Cecilia.Constants.apiPrefix + 'events/' + encodeURIComponent(Cecilia.Constants.current_event_id) + 
        '/pages/' + encodeURIComponent(this.attributes.slug);
        
    },
  });
  Entities.AdminPage = Backbone.Model.extend({
    url: function(){
      return Cecilia.Constants.apiPrefix + 'admin/pages/'  + encodeURIComponent(this.attributes.id); 
    },
  });
  Entities.AdminPageCollection = Backbone.Collection.extend({
    model: Entities.AdminPage,
    url: function(){
      return Cecilia.Constants.apiPrefix + 'admin/events/' + encodeURIComponent(Cecilia.Constants.current_event_id) + '/pages'
    },
  });

  var API = {

    getPage: function(slug){
      var page = new Entities.Page({slug: slug});
      return this._getPromise(page);
    },  
     
    getAdminPage: function(id){
      var page = new Entities.AdminPage({id: id});
      return this._getPromise(page);
    },  
    getAdminPages: function(){
      var pages = new Entities.AdminPageCollection();
      return this._getPromise(pages);
    },  
    _getPromise: function(item){
      var defer = $.Deferred();
      item.fetch({
        success: function(data){
          defer.resolve(data)
        },
        error: function(){
          defer.resolve();
        }
      });
      return defer.promise();
    },
  };

  Cecilia.reqres.setHandler("admin:page:entities",function(){
    return API.getAdminPages();
  });
  Cecilia.reqres.setHandler("admin:page:entity",function(id){
    return API.getAdminPage(id);
  });
  Cecilia.reqres.setHandler("page:entity",function(slug){
    return API.getPage(slug);
  });
});
