Cecilia.module("AdminActivityApp", function(AdminActivityApp, Cecilia, Backbone, Marionette, $, _){
  this.startWithParent = false;//so I can start module in order
  AdminActivityApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "admin/activities" : "listActivities",
      "activities/:id/edit" : "editActivity",
      "admin/scheduler" : "editSchedule",
    }
  });

  AdminActivityApp._API = {
    listActivities: function(){
      AdminActivityApp.List.Controller.listActivities();
    },
    editActivity: function(id){
      AdminActivityApp.Edit.Controller.editActivity(id);
    },
    editSchedule: function(){
      AdminActivityApp.EditSchedule.Controller.editSchedule();
    },
    

  };

  Cecilia.on("admin:activity:edit", function(id){
    Cecilia.navigate('activities/'+ id +'/edit')
    AdminActivityApp._API.editActivity(id);
  });
  Cecilia.on("admin:activity:list", function(){
    Cecilia.navigate('admin/activities')
    AdminActivityApp._API.listActivities();
  });
  Cecilia.on("admin:activity:editSchedule", function(){
    Cecilia.navigate('admin/scheduler')
    AdminActivityApp._API.editSchedule();
  });


  AdminActivityApp.on("start", function(){
    new AdminActivityApp.Router({
      controller: AdminActivityApp._API,
    });
  });
});
