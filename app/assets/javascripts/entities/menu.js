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
      { name: 'Logistics', id: 2, url: 'logistics',children: [
        { name: 'Directions', id: 3, url: 'directions', page_type: 'page'  }, 
        { name: 'Staff', id: 10, url: 'staff', page_type: 'staff'  }, 
        { name: 'Taverns', id: 11, url: 'taverns', page_type: 'page'  }, 
        { name: 'Fees', id: 12, url: 'fees', page_type: 'page'  }, 
        
      ] }, 
      { name: 'Schedule', id: 6, url: 'schedule', children: [
        { name: 'Master Schedule', id: 7, url: 'master', page_type: 'page' }, 
        { name: 'Class Schedule', id: 8, url: 'class_schedule', page_type: 'class_schedule' }, 
      ] }, 
      { name: 'Classes & Activities', url: 'classes_activities', id: 5, children: [
        { name: 'FAQ', id: 1, url: 'faq', page_type: 'page' }, 
        { name: 'Classes', id: 5, url: 'classes', page_type: 'classes' }, 
        { name: 'Teachers', id: 9, url: 'teachers', page_type: 'teachers' }, 
        { name: 'Concert', id: 13, url: 'concert', page_type: 'page'  }, 
        { name: 'Evening Activities', id: 14, url: 'evening_activities', page_type: 'page'  }, 
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