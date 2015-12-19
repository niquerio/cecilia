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

  Entities._menuInitialized = function(){
    return Entities.menuItems !== undefined;
  };
  Entities._initializeMenuItems = function(){
    var menu = new Entities.MenuItemCollection([
      { name: 'Home',   url: 'home'}, 
      { name: 'Logistics',  url: 'logistics', children: [
        { name: 'Directions',  url: 'directions'}, 
        { name: 'Staff',  url: 'staff'}, 
        { name: 'Taverns',  url: 'taverns'}, 
        { name: 'Fees',  url: 'fees'}, 
        
      ] }, 
      { name: 'Schedule',  url: 'schedule', children: [
        { name: 'Master Schedule',  url: 'master'}, 
        { name: 'Class Schedule',  url: 'class_schedule'}, 
      ] }, 
      { name: 'Classes & Activities', url: 'classes_activities',  children: [
        { name: 'FAQ',  url: 'faq'}, 
        { name: 'Classes',  url: 'classes'}, 
        { name: 'Teachers',  url: 'teachers'}, 
        { name: 'Concert',  url: 'concert'}, 
        { name: 'Evening Activities',  url: 'evening_activities'}, 
      ] }, 
      { name: 'Archives',  url: 'archives', children: [
        { name: 'All Classes',  url: 'all_classes'}, 
        { name: 'Teachers',  url: 'all_teachers'}, 
        
      ] }, 
    ]);

    if(Cecilia.currentUser != null){
      menu.add({
        name: 'Admin', url: 'admin', children: [
          {name: 'Manage Classrooms', url: 'admin/classrooms'},
          {name: 'Manage Activities', url: 'admin/activities'},
          {name: 'Manage Pages', url: 'admin/pages'},
        ],
      });
    }
    return menu;
  };

  var API = {
    getMenu: function(){
      if(! Entities._menuInitialized()){
        Entities.menuItems = Entities._initializeMenuItems();
      }
      return Entities.menuItems;
    },
  }

  Cecilia.reqres.setHandler("menu:entities",function(){
    return API.getMenu();
  });
});
