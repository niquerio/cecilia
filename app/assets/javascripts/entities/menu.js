Cecilia.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){

  Entities.MenuItem = Backbone.Model.extend({
    initialize: function(){
      var children = this.get('children');
      this.set('children', new Entities.MenuItemCollection(children));
    },
  });
  Entities.MenuItemCollection = Backbone.Collection.extend({
    model: Entities.MenuItem,
  });

  var initializeMenuItems = function(){
    Entities.menuItems = new Entities.MenuItemCollection([
      { name: 'Home',  id: 4, url: 'home', page_type: 'page' }, 
      { name: 'Logistics', id: 2, url: 'logistics', children: [
        { name: 'Directions', id: 3, url: 'directions', page_type: 'page'  }, 
        
      ] }, 
      { name: 'Classes & Activities', id: 5, url: 'classes-activities', children: [
        { name: 'FAQ', id: 1, url: 'faq', page_type: 'page' }, 
      ] }, 
    ]);
  };

  var API = {
    getMenu: function(){
      if(Entities.menuItems == undefined){
        initializeMenuItems();
      }
      return Entities.menuItems;
    },
  }

  Cecilia.reqres.setHandler("menu:entities",function(){
    return API.getMenu();
  });
});
