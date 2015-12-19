Cecilia.module("AdminActivityApp", function(AdminActivityApp, Cecilia, Backbone, Marionette, $, _){
  this.startWithParent = false;//so I can start module in order
  AdminActivityApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "admin/activities" : "listActivities",
    }
  });

  AdminActivityApp._API = {
    listActivities: function(){
      AdminActivityApp.List.Controller.listActivities();
    },

  };

  Cecilia.on("admin:activity:list", function(){
    Cecilia.navigate('admin/activities')
    AdminActivityApp._API.listActivities();
  });


  AdminActivityApp.on("start", function(){
    new AdminActivityApp.Router({
      controller: AdminActivityApp._API,
    });
  });
});
