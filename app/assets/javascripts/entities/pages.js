Cecilia.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){
  Entities.Page = Backbone.Model.extend({
    url: function(){
      return '/api/events/' + encodeURIComponent(Cecilia.Constants.current_event_id) + 
        '/pages/' + encodeURIComponent(this.attributes.slug);
        
    },
  });
  Entities.PageCollection = Backbone.Collection.extend({
    model: Entities.Page,
  });

  var initializePages = function(){
    Entities.pages = new Entities.PageCollection([
      { title: 'FAQ', body: "It's an FAQ!!", id: 1, slug: 'faq' }, 
      { title: 'Directions', body: "Here's how to get to the place.", id: 2, slug: 'directions' }, 
      { title: 'Home', body: "Come Play Music With us", id: 3, slug: 'home' }, 
      { title: 'Master Schedule', body: "The Whole Schedule", id: 4, slug: 'master_schedule' }, 
    ]);
  };

  var API = {

    getPage: function(slug){
      var page = new Entities.Page({slug: slug});
      var defer = $.Deferred();
      page.fetch({
        success: function(data){
          defer.resolve(data);
        },
        error: function(data){
          defer.resolve('blah');
        }
      });
      var promise = defer.promise();
      return promise;
    },  
     
  };

  Cecilia.reqres.setHandler("page:entity",function(slug){
    return API.getPage(slug);
  });
});
